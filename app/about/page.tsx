"use client"

import { Mail, Dog, Send, Instagram, Code2 } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 md:py-12 space-y-6 mb-16 md:mb-0 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <Dog className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl font-bold mb-2">Dog AI</h1>
            <p className="text-muted-foreground">
              {t('aboutText')}
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('about')}</CardTitle>
              <CardDescription>
                {t('aboutDescription')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                {t('apiDoc')}
              </CardTitle>
              <CardDescription>
                {t('imageGenerationApiDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/api-doc">
                  {t('apiDoc')}
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('developer')}</CardTitle>
              <CardDescription>
                {t('contact')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" size="sm" className="flex items-center" asChild>
                  <a href="https://t.me/h3dev" target="_blank" rel="noopener noreferrer">
                    <Send className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    Telegram
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center" asChild>
                  <a href="https://instagram.com/h3dev.pira" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center" asChild>
                  <a href="mailto:h3dev.pira@gmail.com">
                    <Mail className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <MobileNav />
    </div>
  )
}