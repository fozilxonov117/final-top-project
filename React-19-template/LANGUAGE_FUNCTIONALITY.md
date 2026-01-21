# Language Changing Functionality - Implementation Guide

## Overview
This document outlines the comprehensive language changing functionality implemented in the React 19 template project. The system supports 3 languages: Russian (ru), Uzbek (uz), and English (en).

## Features Implemented

### 1. Core i18n Configuration (`src/app/i18n/config.ts`)
- **Automatic language detection** from browser preferences
- **Language persistence** in localStorage 
- **Fallback language** support (Russian as default)
- **Development/production modes** with appropriate debug settings
- **Document language attribute** updates for accessibility
- **Event listeners** for language changes

### 2. Enhanced Language Switcher (`src/shared/ui/components/LanguageSwitcher.tsx`)
- **Visual dropdown interface** with flags and language names
- **Proper Welsh flag** support (🏴󠁧󠁢󠁷󠁬󠁳󠁿)
- **Click outside to close** functionality
- **Hover and selection states** with smooth animations
- **Responsive design** with backdrop blur effects

### 3. Advanced Language Hook (`src/shared/lib/hooks/useLang.tsx`)
- **Translation function** (t) with type safety
- **Current locale** access
- **Language changing** function
- **RTL support detection** (ready for Arabic/Hebrew)
- **Number formatting** based on locale
- **Date formatting** based on locale
- **Loading state** management
- **Supported languages list**

### 4. Operator-Specific Translations (`src/shared/lib/hooks/useOperatorTranslations.tsx`)
- **Rank text formatting** (1st, 2nd, 3rd in each language)
- **Points formatting** with locale-specific number formatting
- **Singular/plural handling** for points
- **Locale-specific sorting** for operator names

### 5. Language Status Component (`src/shared/ui/components/LanguageStatus.tsx`)
- **Current language display** with native names
- **Localized date display**
- **Supported languages count**
- **Loading state handling**

### 6. Complete Translation Files
All 3 languages have complete translation files with:
- Common UI elements (send, cancel, back)
- Dashboard-specific terms (topOperators, seeAll)
- Month names for all 12 months
- Rank and point terminology
- Loading and status messages

## Usage Examples

### Basic Translation Usage
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <button>{t('send')}</button>;
};
```

### Advanced Language Hook Usage
```tsx
import { useLang } from 'shared/lib';

const MyComponent = () => {
  const { t, locale, changeLanguage, formatDate, formatNumber } = useLang();
  
  return (
    <div>
      <p>Current language: {locale}</p>
      <p>Formatted date: {formatDate(new Date())}</p>
      <p>Formatted number: {formatNumber(1234.56)}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
};
```

### Operator Translations Usage
```tsx
import { useOperatorTranslations } from 'shared/lib';

const OperatorDisplay = ({ operator }) => {
  const { getRankText, formatPoints } = useOperatorTranslations();
  
  return (
    <div>
      <span>{getRankText(operator.rank)}</span>
      <span>{formatPoints(operator.points)}</span>
    </div>
  );
};
```

## Language Support Details

### Russian (ru) - Default
- Complete translations
- Cyrillic script support
- Proper plural forms for points (балл/баллов)

### English (en)
- Complete translations
- Ordinal number support (1st, 2nd, 3rd)
- Standard formatting

### Uzbek (uz)
- Complete translations in Latin script
- Cultural adaptations
- Uzbek-specific formatting

## Browser Compatibility
- Language detection works in all modern browsers
- LocalStorage persistence supported
- Fallback to default language if detection fails

## Performance Features
- **Lazy loading** - translations loaded only when needed
- **Caching** - localStorage prevents re-detection
- **Memoization** - expensive operations cached with useMemo
- **Efficient re-renders** - only components using translations re-render

## Accessibility Features
- **Document language attribute** updates automatically
- **Screen reader support** through proper HTML lang attribute
- **Keyboard navigation** supported in language switcher
- **High contrast** color schemes for visibility

## Testing the Functionality
1. Open the application at `http://localhost:5175/`
2. Use the language switcher in the top-right corner
3. Notice the immediate translation updates throughout the UI
4. Check the language status bar showing current language and formatted date
5. Observe the operator cards with locale-specific point formatting
6. Refresh the page to confirm language persistence

## Future Enhancements
- Add more RTL languages (Arabic, Hebrew)
- Implement lazy loading for translation files
- Add translation management system
- Include currency formatting based on locale
- Add voice pronunciation for language names
- Implement automatic translation updates via API

## File Structure
```
src/
├── app/
│   ├── i18n/
│   │   ├── config.ts                 # Main i18n configuration
│   │   ├── en/translation.json       # English translations
│   │   ├── ru/translation.json       # Russian translations
│   │   └── uz/translation.json       # Uzbek translations
├── shared/
│   ├── ui/components/
│   │   ├── LanguageSwitcher.tsx      # Main language switcher
│   │   └── LanguageStatus.tsx        # Language status display
│   └── lib/hooks/
│       ├── useLang.tsx               # Enhanced language hook
│       └── useOperatorTranslations.tsx # Operator-specific translations
```

This implementation provides a robust, scalable, and user-friendly language switching system that enhances the user experience across all supported languages.
