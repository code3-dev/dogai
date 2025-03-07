"use client"

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { Header } from '@/components/header'
import { MobileNav } from '@/components/mobile-nav'
import { ImageCard } from '@/components/image-card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useLanguage } from '@/components/language-provider'
import { ImageGeneration, getHistoryFromLocalStorage, clearHistory } from '@/lib/utils'

export default function HistoryPage() {
  const [history, setHistory] = useState<ImageGeneration[]>([])
  const [showDeleteAllAlert, setShowDeleteAllAlert] = useState(false)
  const { t } = useLanguage()
  
  useEffect(() => {
    setHistory(getHistoryFromLocalStorage())
  }, [])
  
  const handleDeleteAll = () => {
    clearHistory()
    setHistory([])
    setShowDeleteAllAlert(false)
  }
  
  const handleDeleteImage = () => {
    setHistory(getHistoryFromLocalStorage())
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 md:py-12 space-y-6 mb-16 md:mb-0 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('history')}</h1>
          {history.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={() => setShowDeleteAllAlert(true)}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t('deleteAll')}
            </Button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">{t('noHistory')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((image) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                onDelete={handleDeleteImage} 
              />
            ))}
          </div>
        )}
      </main>
      
      <MobileNav />
      
      <AlertDialog open={showDeleteAllAlert} onOpenChange={setShowDeleteAllAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteAllConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('no')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-destructive-foreground">
              {t('yes')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}