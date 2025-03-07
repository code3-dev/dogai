"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, History, Info, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from './language-provider'

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useLanguage()
  
  const navItems = [
    {
      href: '/',
      label: t('home'),
      icon: Home,
    },
    {
      href: '/history',
      label: t('history'),
      icon: History,
    },
    {
      href: '/settings',
      label: t('settings'),
      icon: Settings,
    },
    {
      href: '/about',
      label: t('about'),
      icon: Info,
    },
  ]
  
  return (
    <div className="md:hidden mobile-nav border-t bg-background/80">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-colors",
              pathname === item.href && "text-primary"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}