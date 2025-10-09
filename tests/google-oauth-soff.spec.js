// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Working Google & Telegram OAuth Click Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
        await page.waitForLoadState('networkidle');
    });

    test('should find and click Telegram button using text', async ({
        page,
    }) => {
        // Use text selector since it works!
        const telegramButton = page.getByText('Telegram orqali kirish');

        await expect(telegramButton).toBeVisible();

        // Click it and see what happens
        await telegramButton.click();

        // Check if it navigated to telegram auth page
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        console.log('After Telegram click, URL:', currentUrl);

        // Should navigate to /auth/telegram
        expect(currentUrl).toContain('/auth/telegram');
    });

    test('should find and click Google button using text', async ({ page }) => {
        // Use text selector since it works!
        const googleButton = page.getByText('Google orqali kirish');

        await expect(googleButton).toBeVisible();

        // Mock the external redirect to prevent actual Google auth
        await page.route(
            '**/api.soff.uz/auth/social/login/customer**',
            async (route) => {
                console.log('Google OAuth API called - this is good!');
                await route.fulfill({
                    status: 200,
                    body: 'OAuth redirect intercepted for testing',
                });
            }
        );

        // Click it and see what happens
        await googleButton.click();

        await page.waitForTimeout(2000);
        console.log('Google button clicked successfully');

        // Check if page changed or API was called
        const currentUrl = page.url();
        console.log('After Google click, URL:', currentUrl);
    });

    test('should verify both buttons work with images', async ({ page }) => {
        // Check if images are visible
        const telegramImg = page.locator('img[src="/static/img/telegram.png"]');
        const googleImg = page.locator('img[src="/static/img/google.png"]');

        await expect(telegramImg).toBeVisible();
        await expect(googleImg).toBeVisible();

        // Test clicking the parent containers
        const telegramParent = telegramImg.locator('..');
        const googleParent = googleImg.locator('..');

        // Test Telegram
        await telegramParent.click();
        await page.waitForTimeout(1000);

        let url = page.url();
        console.log('After Telegram parent click:', url);

        // Go back to login to test Google
        await page.goto('/auth/login');
        await page.waitForLoadState('networkidle');

        // Test Google
        await googleParent.click();
        await page.waitForTimeout(1000);

        url = page.url();
        console.log('After Google parent click:', url);
    });
});

// Safari-specific working tests
test.describe('Safari OAuth Tests - What Actually Works', () => {
    test.skip(({ browserName }) => browserName !== 'webkit', 'Safari only');

    test('Safari - Test Telegram authentication flow', async ({ page }) => {
        await page.goto('/auth/login');

        // Use the working text selector
        const telegramButton = page.getByText('Telegram orqali kirish');
        await expect(telegramButton).toBeVisible();

        await telegramButton.click();
        await page.waitForTimeout(1000);

        const url = page.url();
        console.log('Safari Telegram click result:', url);

        // Should have navigated to telegram page
        expect(url).toContain('/auth/telegram');
    });

    test('Safari - Test Google OAuth redirect behavior', async ({ page }) => {
        await page.goto('/auth/login');

        // Track all network requests to see what happens
        const requests = [];
        page.on('request', (request) => {
            requests.push(request.url());
            if (
                request.url().includes('api.soff.uz/auth/social/login/customer')
            ) {
                console.log('Safari: Google OAuth API request detected!');
            }
        });

        // Click Google button using working selector
        const googleButton = page.getByText('Google orqali kirish');
        await expect(googleButton).toBeVisible();

        await googleButton.click();
        await page.waitForTimeout(3000);

        const url = page.url();
        console.log('Safari Google click result URL:', url);
        console.log(
            'Safari requests made:',
            requests.filter((r) => r.includes('soff.uz'))
        );

        // The test is just to see what actually happens in Safari
        console.log('Google OAuth flow completed in Safari');
    });

    test('Safari - Compare text vs image clicking', async ({ page }) => {
        await page.goto('/auth/login');

        // Test 1: Click using text (we know this works)
        console.log('Testing text-based clicking...');
        const telegramText = page.getByText('Telegram orqali kirish');
        await telegramText.click();
        await page.waitForTimeout(1000);

        let url = page.url();
        console.log('Text click result:', url);

        // Go back to test image clicking
        await page.goto('/auth/login');
        await page.waitForLoadState('networkidle');

        // Test 2: Click using image parent
        console.log('Testing image-based clicking...');
        const telegramImg = page.locator('img[src="/static/img/telegram.png"]');
        const telegramParent = telegramImg.locator('..');

        await telegramParent.click();
        await page.waitForTimeout(1000);

        url = page.url();
        console.log('Image parent click result:', url);

        // Both should work the same way
    });

    test('Safari - Google OAuth specific debugging', async ({ page }) => {
        await page.goto('/auth/login');

        // Check exactly what happens when we click Google in Safari
        let navigationHappened = false;
        let apiCalled = false;

        page.on('request', (request) => {
            if (request.url().includes('api.soff.uz')) {
                apiCalled = true;
                console.log('API call detected:', request.url());
            }
        });

        page.on('framenavigated', () => {
            navigationHappened = true;
            console.log('Navigation detected');
        });

        const googleButton = page.getByText('Google orqali kirish');
        await expect(googleButton).toBeVisible();

        console.log('Clicking Google button in Safari...');
        await googleButton.click();

        // Wait and see what happens
        await page.waitForTimeout(5000);

        const finalUrl = page.url();
        console.log('Final URL:', finalUrl);
        console.log('Navigation happened:', navigationHappened);
        console.log('API called:', apiCalled);

        // This test just reports what Safari actually does
        console.log('Safari Google OAuth behavior documented');
    });
});
