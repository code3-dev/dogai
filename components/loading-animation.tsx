"use client"

import { Dog } from 'lucide-react'
import { useLanguage } from './language-provider'

export function LoadingAnimation() {
  const { t } = useLanguage()
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Dog className="h-16 w-16 text-primary dog-loading mb-4" />
      <p className="text-muted-foreground animate-pulse">{t('loading')}</p>
    </div>
  )
}