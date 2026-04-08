"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Shield, Lock } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Disclaimer & Privacy
        </h1>

        <Card className="mb-8 bg-background/50 backdrop-blur-md border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-400" />
              Privacy Policy
            </CardTitle>
            <CardDescription>How we handle your data (we don't)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              None of your passwords are stored, logged, or shared. All operations are performed locally on your device.
            </p>
            <p>
              This site is secured and deployed via v0.dev and Vercel hosting, ensuring a safe and reliable experience.
            </p>
            <p>We do not use cookies or any tracking mechanisms. Your privacy is our priority.</p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-background/50 backdrop-blur-md border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-400" />
              Security Information
            </CardTitle>
            <CardDescription>How our V2X password generator works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SecurePassV2X uses your browser's built-in cryptographically secure random number generator to create
              passwords with advanced V2X technology.
            </p>
            <p>All password generation happens entirely in your browser. No data is ever sent to our servers.</p>
            <p>
              We recommend using passwords that are at least 12 characters long with a mix of uppercase letters,
              lowercase letters, numbers, and special characters for maximum security.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5 text-purple-400" />
              Open Source
            </CardTitle>
            <CardDescription>This project is open source</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SecurePassV2X is fully open source! Feel free to explore the code, contribute, or fork it for your own projects.
            </p>
            <p className="text-sm text-muted-foreground bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <strong>Important:</strong> This project is intended for educational and legitimate security purposes only. 
              Do not use this code for malicious purposes including but not limited to creating password stealers, 
              phishing tools, or any unauthorized access tools. Misuse may result in legal consequences.
            </p>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button asChild variant="outline" className="border-purple-500/30 hover:bg-purple-500/10">
              <a href="https://github.com/yourusername/securepassv2x" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-purple-500/10">
              <a href="https://github.com/yourusername/securepassv2x/fork" target="_blank" rel="noopener noreferrer">
                Fork Repository
              </a>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Link href="/generate">Generate a Password</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
