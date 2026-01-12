# i18n Usage Guide

This project uses `next-i18next` for internationalization. Here's how to use it:

## Setup Complete ✅

- ✅ `next-i18next.config.js` - Configuration file
- ✅ `next.config.js` - Updated with i18n config
- ✅ `pages/_app.jsx` - Wrapped with `appWithTranslation`
- ✅ Translation files created in `public/locales/`

## Supported Languages

- `uz` - O'zbek (Default)
- `en` - English
- `ru` - Русский

## How to Use Translations

### 1. In Pages (Server-Side)

```javascript
// pages/example.jsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ExamplePage() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
```

### 2. In Pages (Static)

```javascript
// pages/example.jsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ExamplePage() {
  const { t } = useTranslation('common');
  
  return <h1>{t('welcome')}</h1>;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
```

### 3. In Client Components

```javascript
// components/MyComponent.jsx
import { useTranslation } from 'next-i18next';

export default function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <button>{t('common.save')}</button>
      <button>{t('common.cancel')}</button>
    </div>
  );
}
```

### 4. Using Nested Keys

```javascript
const { t } = useTranslation('common');

// Access nested keys with dot notation
t('navigation.home')        // "Bosh sahifa" / "Home" / "Главная"
t('common.loading')        // "Yuklanmoqda..." / "Loading..." / "Загрузка..."
t('messages.commentSuccess') // "Izoh muvaffaqiyatli yuborildi!"
```

### 5. With Variables/Interpolation

Add to your translation files:
```json
{
  "greeting": "Salom, {{name}}!"
}
```

Use in component:
```javascript
const { t } = useTranslation('common');
t('greeting', { name: 'John' }) // "Salom, John!"
```

### 6. Language Switcher Component

```javascript
// components/LanguageSwitcher.jsx
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale: currentLocale } = router;
  const { t } = useTranslation('common');

  const changeLanguage = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => changeLanguage(locale)}
          className={locale === currentLocale ? 'active' : ''}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### 7. Update Existing Component Example

Here's how to update `commentForm.jsx`:

```javascript
import { useTranslation } from 'next-i18next';

export default function CommentForm({ ... }) {
  const { t } = useTranslation('common');
  
  const handleSubmit = async (values) => {
    const token = Cookies.get('token');
    if (!token) {
      message.error(t('messages.tokenNotFound'));
      return;
    }
    
    try {
      // ... API call
      message.success(t('messages.commentSuccess'));
    } catch (err) {
      message.error(t('messages.commentError'));
    }
  };
  
  return (
    <Form>
      <TextArea placeholder={t('common.commentPlaceholder')} />
      <Button>{t('common.submit')}</Button>
    </Form>
  );
}
```

## Adding New Translation Keys

1. Add the key to all language files:
   - `public/locales/uz/common.json`
   - `public/locales/en/common.json`
   - `public/locales/ru/common.json`

2. Use it in your component:
   ```javascript
   const { t } = useTranslation('common');
   t('your.new.key')
   ```

## URL Structure

With i18n enabled, your URLs will be:
- `/uz/page` - Uzbek (default)
- `/en/page` - English
- `/ru/page` - Russian

Or `/page` will redirect to `/uz/page` (default locale).

## Next Steps

1. Add more translation keys to `public/locales/*/common.json`
2. Update existing components to use `useTranslation` hook
3. Create a language switcher component
4. Add more translation namespaces if needed (e.g., `products.json`, `auth.json`)
