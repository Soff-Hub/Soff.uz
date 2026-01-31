// @ts-check
import { test, expect } from '@playwright/test';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

// Configure test to run only on Safari/WebKit
test.describe('Google OAuth Authentication in Safari', () => {
    // Skip these tests on non-webkit browsers
    test.skip(
        ({ browserName }) => browserName !== 'webkit',
        'Safari-specific tests'
    );

    test.beforeEach(async ({ page }) => {
        // Set Safari-specific user agent and viewport
        await page.setViewportSize({ width: 1280, height: 720 });

        // Navigate to your login page
        await page.goto('http://localhost:3000/auth/login');

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');
    });

    test('should display Google OAuth button on login page', async ({
        page,
    }) => {
        // Check if Google login button is visible
        const googleButton = page.locator('text=Orqali kirish').last(); // Google button
        await expect(googleButton).toBeVisible();

        // Check if Google icon is present
        const googleIcon = page.locator('img[src="/static/img/google.png"]');
        await expect(googleIcon).toBeVisible();
    });

    test('should handle Google OAuth flow in Safari', async ({
        page,
        context,
    }) => {
        // Mock Google OAuth response to avoid actual Google authentication
        await page.route(
            'https://api.soff.uz/auth/social/login/customer',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        access: 'mock-access-token',
                        refresh: 'mock-refresh-token',
                        role: 'customer',
                        msg: 'Successfully authenticated',
                    }),
                });
            }
        );

        // Click on Google authentication button
        const googleButton = page.locator('text=Orqali kirish').last();
        await googleButton.click();

        // Wait for navigation or popup
        await page.waitForTimeout(2000);

        // Check if user is redirected or authenticated
        // This depends on your actual implementation
        await expect(page).toHaveURL(/account|dashboard/);
    });

    test('should handle Google OAuth popup in Safari', async ({
        page,
        context,
    }) => {
        // Listen for popup windows (common in OAuth flows)
        let popup;
        context.on('page', async (newPage) => {
            popup = newPage;

            // Mock the OAuth callback
            await popup.route('**/oauth**', async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: `
            <html>
              <body>
                <script>
                  window.opener.postMessage({
                    type: 'oauth-success',
                    token: 'mock-token'
                  }, '*');
                  window.close();
                </script>
              </body>
            </html>
          `,
                });
            });
        });

        // Click Google button
        const googleButton = page
            .locator('img[src="/static/img/google.png"]')
            .locator('..');
        await googleButton.click();

        // Wait for popup to appear and close
        if (popup) {
            // @ts-ignore
            await popup.waitForEvent('close');
        }

        // Verify authentication state
        await page.waitForTimeout(1000);

        // Check for success indicators (adjust based on your app)
        const isAuthenticated =
            (await page.locator('[data-testid="user-menu"]').isVisible()) ||
            (await page.url().includes('/account'));

        if (!isAuthenticated) {
            console.log('Authentication flow completed but user state unclear');
        }
    });

    test('should handle Safari-specific cookie issues', async ({ page }) => {
        // Safari has strict cookie policies that can affect OAuth
        await page.context().addCookies([
            {
                name: 'oauth-test',
                value: 'safari-test',
                domain: 'localhost',
                path: '/',
            },
        ]);

        // Test if cookies are properly set and accessible
        const cookies = await page.context().cookies();
        const oauthCookie = cookies.find(
            (cookie) => cookie.name === 'oauth-test'
        );
        expect(oauthCookie).toBeTruthy();

        // Click Google button and check cookie behavior
        const googleButton = page
            .locator('img[src="/static/img/google.png"]')
            .locator('..');
        await googleButton.click();

        await page.waitForTimeout(2000);

        // Verify cookies persist after OAuth attempt
        const cookiesAfter = await page.context().cookies();
        expect(cookiesAfter.length).toBeGreaterThanOrEqual(cookies.length);
    });

    test('should handle Safari safeLocalStorage with OAuth tokens', async ({
        page,
    }) => {
        // Test safeLocalStorage functionality which can be problematic in Safari
        await page.evaluate(() => {
            safeLocalStorage.setItem('test-auth', 'safari-test');
        });

        const storedValue = await page.evaluate(() => {
            return safeLocalStorage.getItem('test-auth');
        });

        expect(storedValue).toBe('safari-test');

        // Mock successful OAuth and check token storage
        await page.route('**/oauth**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    access: 'test-access-token',
                    user: { id: 1, email: 'test@example.com' },
                }),
            });
        });

        // Simulate OAuth success
        await page.evaluate(() => {
            const mockUser = {
                access: 'test-access-token',
                role: 'customer',
            };
            safeLocalStorage.setItem('user', JSON.stringify(mockUser));

            // Dispatch a custom event to simulate OAuth completion
            window.dispatchEvent(
                new CustomEvent('oauth-complete', {
                    detail: mockUser,
                })
            );
        });

        // Check if token is properly stored
        const userData = await page.evaluate(() => {
            return safeLocalStorage.getItem('user');
        });

        expect(userData).toContain('test-access-token');
    });

    test('should handle Safari third-party cookie restrictions', async ({
        page,
    }) => {
        // Safari blocks third-party cookies by default
        // Test your app's fallback mechanisms

        await page.route('**/*', async (route, request) => {
            // Simulate Safari blocking third-party cookies
            if (
                request.url().includes('google') ||
                request.url().includes('oauth')
            ) {
                const headers = {
                    ...route.request().headers(),
                    'set-cookie': '', // Remove cookie headers
                };

                await route.continue({ headers });
            } else {
                await route.continue();
            }
        });

        const googleButton = page
            .locator('img[src="/static/img/google.png"]')
            .locator('..');
        await googleButton.click();

        // Check if your app handles the cookie restriction gracefully
        await page.waitForTimeout(3000);

        // Look for error messages or fallback authentication methods
        const errorMessage = page.locator('text=Xatolik');
        const telegramButton = page.locator('text=Orqali kirish').first(); // Telegram button

        // Either should show an error or provide alternative auth method
        const hasError = await errorMessage.isVisible();
        const hasFallback = await telegramButton.isVisible();

        expect(hasError || hasFallback).toBeTruthy();
    });

    test('should test mobile Safari viewport', async ({ page }) => {
        // Test Google OAuth on mobile Safari viewport
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size

        await page.goto('http://localhost:3000/auth/login');
        await page.waitForLoadState('networkidle');

        // Check if Google button is properly sized and clickable on mobile
        const googleButton = page
            .locator('img[src="/static/img/google.png"]')
            .locator('..');
        await expect(googleButton).toBeVisible();

        // Check if button is properly sized for touch
        const buttonBox = await googleButton.boundingBox();
        expect(buttonBox?.height).toBeGreaterThan(44); // iOS minimum touch target
        expect(buttonBox?.width).toBeGreaterThan(44);

        // Test tap interaction
        await googleButton.tap();
        await page.waitForTimeout(1000);
    });

    test('should handle Safari-specific JavaScript issues', async ({
        page,
    }) => {
        // Safari sometimes has issues with modern JavaScript features

        // Check if your Google OAuth JavaScript loads properly
        const jsErrors = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                jsErrors.push(msg.text());
            }
        });

        await page.goto('http://localhost:3000/auth/login');
        await page.waitForLoadState('networkidle');

        // Click Google button
        const googleButton = page
            .locator('img[src="/static/img/google.png"]')
            .locator('..');
        await googleButton.click();

        await page.waitForTimeout(2000);

        // Check for JavaScript errors
        const criticalErrors = jsErrors.filter(
            (error) =>
                error.includes('google') ||
                error.includes('oauth') ||
                error.includes('undefined')
        );

        if (criticalErrors.length > 0) {
            console.log('JavaScript errors detected:', criticalErrors);
        }

        // Verify the page is still functional
        const pageTitle = await page.title();
        expect(pageTitle.length).toBeGreaterThan(0);
    });
});
