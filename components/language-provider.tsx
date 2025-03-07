"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'fa'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    home: 'Home',
    history: 'History',
    about: 'About',
    settings: 'Settings',
    generate: 'Generate',
    prompt: 'Enter your prompt',
    download: 'Download',
    delete: 'Delete',
    deleteAll: 'Delete All',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    developer: 'Developer',
    contact: 'Contact',
    loading: 'Loading...',
    noHistory: 'No history found',
    generatedAt: 'Generated at',
    downloadAs: 'Download as',
    clearPrompt: 'Clear',
    noPrompt: 'Please enter a prompt',
    generationError: 'Error generating image',
    deleteConfirm: 'Are you sure you want to delete this image?',
    deleteAllConfirm: 'Are you sure you want to delete all images?',
    yes: 'Yes',
    no: 'No',
    copied: 'Copied to clipboard',
    aboutText: 'Dog AI is a modern AI image generation platform that allows you to generate beautiful images.',
    aboutDescription: 'Dog AI is a powerful platform that leverages advanced artificial intelligence to create stunning images from text descriptions. Whether you\'re an artist, designer, or just someone who loves creating unique visuals, our platform provides the tools you need to bring your imagination to life.',
    dimensionHelp: 'Width & height must be between <strong>256</strong> and <strong>1440</strong>, and multiples of <strong>16</strong>.',
    width: 'Width',
    height: 'Height',
    enhancePrompt: 'Enhance prompt with AI',
    enhancing: 'Enhancing prompt...',
    enhanced: 'Prompt enhanced successfully',
    enhanceError: 'Failed to enhance prompt',
    cooldownActive: 'Cooldown Active',
    waitCooldown: 'Please wait {seconds} seconds before generating another image',
    apiDoc: 'API Documentation',
    imageGenerationApi: 'Image Generation API',
    imageGenerationApiDescription: 'Generate beautiful images from text prompts using AI',
    promptEnhancementApi: 'Prompt Enhancement API',
    promptEnhancementApiDescription: 'Enhance your prompts to generate better images',
    endpoint: 'Endpoint',
    requiredHeaders: 'Required Headers',
    requestBody: 'Request Body',
    exampleRequests: 'Example Requests',
  },
  fa: {
    home: 'خانه',
    history: 'تاریخچه',
    about: 'درباره',
    settings: 'تنظیمات',
    generate: 'ایجاد',
    prompt: 'متن خود را وارد کنید',
    download: 'دانلود',
    delete: 'حذف',
    deleteAll: 'حذف همه',
    darkMode: 'حالت تاریک',
    lightMode: 'حالت روشن',
    language: 'زبان',
    developer: 'توسعه دهنده',
    contact: 'تماس',
    loading: 'در حال بارگذاری...',
    noHistory: 'تاریخچه‌ای یافت نشد',
    generatedAt: 'ایجاد شده در',
    downloadAs: 'دانلود به عنوان',
    clearPrompt: 'پاک کردن',
    noPrompt: 'لطفا یک متن وارد کنید',
    generationError: 'خطا در ایجاد تصویر',
    deleteConfirm: 'آیا مطمئن هستید که می‌خواهید این تصویر را حذف کنید؟',
    deleteAllConfirm: 'آیا مطمئن هستید که می‌خواهید همه تصاویر را حذف کنید؟',
    yes: 'بله',
    no: 'خیر',
    copied: 'در کلیپ بورد کپی شد',
    aboutText: 'داگ ای‌آی یک پلتفرم مدرن تولید تصویر با هوش مصنوعی است که به شما امکان می‌دهد تصاویر زیبایی ایجاد کنید.',
    aboutDescription: 'داگ ای‌آی یک پلتفرم قدرتمند است که از هوش مصنوعی پیشرفته برای ایجاد تصاویر خیره‌کننده از توضیحات متنی استفاده می‌کند. چه یک هنرمند، طراح باشید یا کسی که عاشق خلق تصاویر منحصر به فرد است، پلتفرم ما ابزارهای مورد نیاز شما را برای زنده کردن تخیلاتتان فراهم می‌کند.',
    dimensionHelp: 'عرض و ارتفاع باید بین <strong>256</strong> تا <strong>1440</strong> و مضربی از <strong>16</strong> باشند.',
    width: 'عرض',
    height: 'ارتفاع',
    enhancePrompt: 'بهبود متن با هوش مصنوعی',
    enhancing: 'در حال بهبود متن...',
    enhanced: 'متن با موفقیت بهبود یافت',
    enhanceError: 'خطا در بهبود متن',
    cooldownActive: 'زمان انتظار فعال',
    waitCooldown: 'لطفا {seconds} ثانیه صبر کنید تا بتوانید تصویر دیگری ایجاد کنید',
    apiDoc: 'مستندات API',
    imageGenerationApi: 'API تولید تصویر',
    imageGenerationApiDescription: 'تولید تصاویر زیبا از متن با استفاده از هوش مصنوعی',
    promptEnhancementApi: 'API بهبود متن',
    promptEnhancementApiDescription: 'بهبود متن‌های شما برای تولید تصاویر بهتر',
    endpoint: 'نقطه پایانی',
    requiredHeaders: 'هدرهای مورد نیاز',
    requestBody: 'بدنه درخواست',
    exampleRequests: 'نمونه درخواست‌ها',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    } else {
      setLanguageState('fa')
      localStorage.setItem('language', 'fa')
    }

    if (savedLanguage === 'fa' || !savedLanguage) {
      document.documentElement.dir = 'rtl'
    } else if (savedLanguage === 'en' || !savedLanguage) {
      document.documentElement.dir = 'ltr'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)

    // Set RTL direction for Farsi
    if (lang === 'fa') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}