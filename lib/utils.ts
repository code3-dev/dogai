import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ImageGeneration = {
  id: string;
  prompt: string;
  imageData: string;
  timestamp: number;
  format: 'png' | 'jpeg';
}

export function formatDate(timestamp: number, locale: string = 'en'): string {
  return new Date(timestamp).toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function downloadImage(imageData: string, format: 'png' | 'jpeg', prompt: string): void {
  const link = document.createElement('a');
  link.href = `data:image/${format};base64,${imageData}`;
  // Use .jpg extension for jpeg format
  const extension = format === 'jpeg' ? 'jpg' : format;
  link.download = `dog-ai-${prompt.slice(0, 20).replace(/\s+/g, '-')}-${Date.now()}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function convertBase64Format(base64Data: string, format: 'png' | 'jpeg'): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      // Remove the data:image/...;base64, prefix
      const base64WithoutPrefix = canvas.toDataURL(`image/${format}`).split(',')[1];
      resolve(base64WithoutPrefix);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = `data:image/png;base64,${base64Data}`;
  });
}

export function getHistoryFromLocalStorage(): ImageGeneration[] {
  if (typeof window === 'undefined') return [];
  
  const history = localStorage.getItem('dogAiHistory');
  if (!history) return [];
  
  try {
    return JSON.parse(history);
  } catch (error) {
    console.error('Failed to parse history from localStorage', error);
    return [];
  }
}

export function saveHistoryToLocalStorage(history: ImageGeneration[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dogAiHistory', JSON.stringify(history));
}

export function saveImageToHistory(imageGeneration: ImageGeneration): void {
  const history = getHistoryFromLocalStorage();
  history.unshift(imageGeneration);
  saveHistoryToLocalStorage(history);
}

export function deleteImageFromHistory(id: string): void {
  const history = getHistoryFromLocalStorage();
  const newHistory = history.filter(item => item.id !== id);
  saveHistoryToLocalStorage(newHistory);
}

export function clearHistory(): void {
  saveHistoryToLocalStorage([]);
}