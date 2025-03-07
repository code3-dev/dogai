"use client"

import Link from 'next/link'
import { Dog } from 'lucide-react'
import { useLanguage } from './language-provider'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  
  const navItems = [
    {
      href: '/',
      label: t('home'),
    },
    {
      href: '/history',
      label: t('history'),
    },
    {
      href: '/settings',
      label: t('settings'),
    },
    {
      href: '/api-doc',
      label: t('apiDoc'),
    },
    {
      href: '/about',
      label: t('about'),
    },
  ]
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-3">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <Dog className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">Dog AI</span>
        </Link>
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6 rtl:space-x-reverse">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4 rtl:space-x-reverse">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}