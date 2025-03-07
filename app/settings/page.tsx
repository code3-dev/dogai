"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/components/language-provider'
import { Moon, Sun, Globe, Info, Laptop2 } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-6 md:py-12 space-y-6 mb-16 md:mb-0 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t('settings')}</h1>

        <div className="grid gap-6 max-w-2xl mx-auto">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg md:text-xl">{t('darkMode')}</CardTitle>
              </div>
              <CardDescription>
                {t('darkMode')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={theme}
                onValueChange={setTheme}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-4 w-4 rtl:ml-2" />
                    <span>{t('lightMode')}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="h-4 w-4 rtl:ml-2" />
                    <span>{t('darkMode')}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                  <Laptop2 className="h-4 w-4 rtl:ml-2" />
                    <span>System</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg md:text-xl">{t('language')}</CardTitle>
              </div>
              <CardDescription>
                {t('language')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={language}
                onValueChange={(value) => setLanguage(value as 'en' | 'fa')}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="cursor-pointer rtl:pl-2">English</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="fa" id="fa" />
                  <Label htmlFor="fa" className="cursor-pointer rtl:pl-2">فارسی</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg md:text-xl">{t('about')}</CardTitle>
              </div>
              <CardDescription>
                {t('about')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Dog AI</h3>
                <p className="text-sm text-muted-foreground">Version 1.1.0</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">{t('developer')}</h3>
                <p className="text-sm text-muted-foreground">© 2025 Hossein Pira</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}