# Playwright Testing Guide for Google OAuth in Safari

## Overview

This guide helps you test Google OAuth authentication specifically in Safari
browser using Playwright. Safari has unique behavior with cookies, localStorage,
and third-party authentication that can cause issues.

## Setup Instructions

### 1. Install Playwright Browsers

```bash
# Install all browsers including Safari (WebKit)
npx playwright install

# Or install only Safari
npx playwright install webkit
```

### 2. Start Your Development Server

Make sure your Next.js development server is running:

```bash
npm run dev
```

### 3. Run Tests

#### Run All Tests

```bash
npx playwright test
```

#### Run Only Safari Tests

```bash
npx playwright test --project=webkit
```

#### Run Specific Google OAuth Tests

```bash
# Run the focused Google OAuth tests
npx playwright test google-oauth-soff.spec.js

# Run comprehensive Safari-specific tests
npx playwright test safari-google-auth.spec.js
```

#### Run with UI Mode (Recommended for Development)

```bash
npx playwright test --ui
```

### 4. Debug Tests

```bash
# Run in debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test google-oauth-soff.spec.js --debug
```

## Common Safari Issues and How Tests Address Them

### 1. Third-Party Cookie Blocking

**Issue**: Safari blocks third-party cookies by default, which can break OAuth
flows. **Test**: `should handle Safari third-party cookie restrictions`

### 2. localStorage Restrictions

**Issue**: Safari in private mode or with strict settings can limit
localStorage. **Test**: `should test Safari localStorage limitations`

### 3. Popup Blocking

**Issue**: Safari may block OAuth popup windows. **Test**:
`should handle Google OAuth popup in Safari`

### 4. CORS Issues

**Issue**: Safari has stricter CORS policies. **Test**: Configuration includes
`ignoreHTTPSErrors: true`

## Test Files Explanation

### `google-oauth-soff.spec.js`

-   Focused tests for your specific Soff.uz Google OAuth implementation
-   Tests login page loading, button interactions, OAuth callbacks
-   Includes Safari-specific cookie and localStorage tests

### `safari-google-auth.spec.js`

-   Comprehensive Safari-specific testing scenarios
-   Tests mobile Safari viewport, JavaScript compatibility
-   Handles Safari's unique security restrictions

## Understanding Your OAuth Flow

Based on your code, here's how your Google OAuth works:

1. **Login Page**: `/auth/login` displays Google button
2. **Google Button Click**: Redirects to
   `https://api.soff.uz/auth/social/login/customer`
3. **OAuth Callback**: Returns to `/oauth` page with JWT token
4. **Token Processing**: `oauth.jsx` processes the token and logs user in
5. **Redirect**: User redirected to dashboard or specified return URL

## Key Test Scenarios

### 1. Basic Functionality Test

```javascript
test('should load login page and display Google auth option', async ({
    page,
}) => {
    await expect(page).toHaveTitle(/Soff\.uz/);
    const googleButton = page.locator('img[src="/static/img/google.png"]');
    await expect(googleButton).toBeVisible();
});
```

### 2. OAuth Flow Test

```javascript
test('should handle Google OAuth button click', async ({ page }) => {
    // Mock the API call to prevent actual Google redirect
    await page.route(
        'https://api.soff.uz/auth/social/login/customer',
        async (route) => {
            await route.fulfill({ status: 302, headers: { Location: '...' } });
        }
    );

    const googleButton = page
        .locator('img[src="/static/img/google.png"]')
        .locator('..');
    await googleButton.click();
});
```

### 3. Safari-Specific Test

```javascript
test('should handle Safari cookie restrictions', async ({ page, context }) => {
    // Simulate Safari's cookie blocking
    await context.route('**/*', async (route, request) => {
        if (request.url().includes('google')) {
            await route.continue({
                headers: { ...request.headers(), cookie: '' },
            });
        }
    });
});
```

## Troubleshooting

### Test Failures

1. **Server not starting**: Ensure `npm run dev` works and port 3000 is
   available
2. **Element not found**: Check if selectors match your actual HTML
3. **Timeout errors**: Increase timeout in test configuration

### Safari-Specific Issues

1. **Third-party cookies**: Tests simulate this scenario
2. **Popup blocking**: Use `context.on('page')` to handle popups
3. **localStorage issues**: Tests check for fallback mechanisms

### Common Commands

```bash
# Generate test code (helpful for new tests)
npx playwright codegen localhost:3000/auth/login

# Show test report
npx playwright show-report

# Update screenshots
npx playwright test --update-snapshots
```

## Best Practices

1. **Mock External APIs**: Always mock Google OAuth API calls in tests
2. **Test Error Scenarios**: Include tests for failed OAuth attempts
3. **Mobile Testing**: Test on Mobile Safari viewport
4. **Fallback Methods**: Ensure Telegram auth works when Google fails
5. **localStorage Fallbacks**: Test behavior when localStorage is restricted

## Production Considerations

When deploying to production, ensure:

-   HTTPS is properly configured (required for secure cookies)
-   Cross-origin requests are properly handled
-   Fallback authentication methods are available
-   Error handling provides clear user feedback

## Next Steps

1. Run the provided tests to identify current issues
2. Add more specific tests based on your user reports
3. Consider implementing additional fallback mechanisms
4. Monitor real Safari user behavior with analytics
