"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function GeneratePage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [includeRareSymbols, setIncludeRareSymbols] = useState(false)

  // Generate password on initial load and when options change
  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, includeRareSymbols])

  const generatePassword = () => {
    let charset = ""
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?"
    if (includeRareSymbols)
      charset +=
        "⭐🍔🔥💀♞†🌟🎮🚀🎯🎪🎨🎭🎪🌈🦄🐉🔮⚡🌙☀️🌊🍕🎵🎸🎤🎬🎲🎯🏆🎊🎉✨💎🔥🌟⚔️🛡️🏹🗡️🔱⚡🌪️❄️🌋🌈🦋🐺🦅🐲🦁🐯🦊🐸🦜🐙🦑🦈🐢🦎🐍🕷️🦂🦗🐛🐝🐞🦟🦠🧬🔬🧪⚗️🧲🔭🛰️🚁🛸🚂🚗🏎️🚓🚑🚒🚐🛻🚚🚛🚜🏍️🛵🚲🛴🛹🛼⛸️🎿⛷️🏂🪂🏋️🤸🤾🏌️🏇🧘🏃🚶"

    // Ensure at least one character set is selected
    if (charset === "") {
      setIncludeLowercase(true)
      charset = "abcdefghijklmnopqrstuvwxyz"
    }

    let result = ""
    const charactersLength = charset.length

    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength))
    }

    setPassword(result)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    })

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          SecurePassV2X Generator
        </h1>

        <Card className="bg-background/50 backdrop-blur-md border-purple-500/20">
          <CardHeader>
            <CardTitle>Generate a Secure Password</CardTitle>
            <CardDescription>
              Customize your password options and generate a strong, secure password with V2X technology.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Generated Password</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={generatePassword} title="Generate new password">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Input id="password" value={password} readOnly className="font-mono text-lg pr-24" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="length">Password Length: {length}</Label>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">8</span>
                  <Slider
                    id="length"
                    min={8}
                    max={64}
                    step={1}
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                    className="flex-1"
                  />
                  <span className="text-sm">64</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
                  <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
                  <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                  <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="symbols">Special Characters (!@#$%)</Label>
                  <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
                </div>

                <div className="flex items-center justify-between space-x-2 sm:col-span-2">
                  <Label htmlFor="rare-symbols">V2X Rare Symbols (⭐🍔🔥💀♞†)</Label>
                  <Switch id="rare-symbols" checked={includeRareSymbols} onCheckedChange={setIncludeRareSymbols} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">All password generation happens locally in your browser.</p>
            <Button
              onClick={generatePassword}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Generate
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Need more information? Check out our{" "}
            <a href="/disclaimer" className="underline hover:text-primary">
              disclaimer page
            </a>
            .
          </p>
        </div>
      </div>
    </motion.div>
  )
}
