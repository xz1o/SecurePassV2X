"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Generate", href: "/generate" },
    { name: "Username", href: "/generate-username" },
    { name: "Disclaimer", href: "/disclaimer" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3408516-W20uyLbM6TUv76nSUtsiQ6ykUfttej.png"
              alt="SecurePassV2X Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SecurePassV2X
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/50",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <ModeToggle />
          <div className="md:hidden">
            <MobileNav items={navItems} pathname={pathname} />
          </div>
        </nav>
      </div>
    </header>
  )
}

function MobileNav({ items, pathname }: { items: { name: string; href: string }[]; pathname: string }) {
  return (
    <div className="relative">
      <details className="group [&[open]>summary::after]:rotate-180">
        <summary className="list-none cursor-pointer">
          <div className="p-2 rounded-md hover:bg-accent/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </div>
        </summary>
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-popover/90 backdrop-blur-md shadow-md z-50 overflow-hidden">
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-sm",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
