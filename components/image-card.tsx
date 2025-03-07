"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Download, Trash2, Copy } from 'lucide-react'
import { Button } from './ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Card, CardContent, CardFooter } from './ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from './language-provider'
import { ImageGeneration, downloadImage, formatDate, deleteImageFromHistory } from '@/lib/utils'

interface ImageCardProps {
  image: ImageGeneration
  onDelete: () => void
}

export function ImageCard({ image, onDelete }: ImageCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const { toast } = useToast()
  const { t, language } = useLanguage()
  
  const handleDownload = (format: 'png' | 'jpeg') => {
    downloadImage(image.imageData, format, image.prompt)
  }
  
  const handleDelete = () => {
    deleteImageFromHistory(image.id)
    onDelete()
    setShowDeleteAlert(false)
  }
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt)
    toast({
      title: t('copied'),
      duration: 2000,
    })
  }
  
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="image-container aspect-[4/3]">
            <Image
              src={`data:image/png;base64,${image.imageData}`}
              alt={image.prompt}
              fill
              className="object-cover"
            />
            <div className="image-overlay">
              <div className="flex space-x-2 rtl:space-x-reverse mb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="secondary">
                      <Download className="h-4 w-4 mr-2 rtl:ml-2" />
                      {t('download')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload('png')}>
                      PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('jpeg')}>
                      JPEG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="destructive" onClick={() => setShowDeleteAlert(true)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <div className="flex justify-between w-full mb-2">
            <p className="text-xs text-muted-foreground">
              {t('generatedAt')}: {formatDate(image.timestamp, language)}
            </p>
            <Button variant="ghost" size="icon" onClick={handleCopyPrompt}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm line-clamp-2">{image.prompt}</p>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('no')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {t('yes')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}