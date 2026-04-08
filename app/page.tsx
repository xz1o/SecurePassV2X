"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center"
    >
      <div className="flex flex-col items-center space-y-6 max-w-3xl">
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3408516-W20uyLbM6TUv76nSUtsiQ6ykUfttej.png"
            alt="SecurePassV2X Logo"
            width={150}
            height={150}
            className="rounded-full"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            SecurePassV2X
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-prose">
          Generate strong, secure passwords and usernames for your online accounts instantly with our advanced HYPERX AI
          technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Link href="/generate">Generate Password</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg border-purple-500/50 hover:bg-purple-500/10">
            <Link href="/generate-username">Generate Username</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="text-lg">
            <Link href="/disclaimer">Learn More</Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-background/50 backdrop-blur-md rounded-lg max-w-md border border-purple-500/20">
          <h2 className="text-xl font-bold mb-2">Why Use SecurePassV2X?</h2>
          <ul className="text-left space-y-2">
            <li className="flex items-start gap-2">
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
                className="text-purple-400 shrink-0 mt-0.5"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span>Completely private - all generation happens locally</span>
            </li>
            <li className="flex items-start gap-2">
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
                className="text-purple-400 shrink-0 mt-0.5"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span>Advanced V2X technology with rare symbols</span>
            </li>
            <li className="flex items-start gap-2">
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
                className="text-purple-400 shrink-0 mt-0.5"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span>Instant generation with bulk availability checking</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
