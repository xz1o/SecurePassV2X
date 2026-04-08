"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Copy, Loader2, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Platform = "youtube" | "tiktok" | "instagram" | "snapchat" | "discord" | "twitch" | "twitter"
type Style = "funny" | "clean" | "og" | "gamer" | "aesthetic"

type UsernameStatus = {
  username: string
  status: "available" | "taken" | "unknown" | "error" | "pending" | "unchecked"
  message: string
}

interface BulkUsernameGeneratorProps {
  platform: Platform
  style: Style
  usernameTemplates: any
  platforms: { id: Platform; name: string; icon: string }[]
  styles: { id: Style; name: string; description: string }[]
}

export function BulkUsernameGenerator({
  platform,
  style,
  usernameTemplates,
  platforms,
  styles,
}: BulkUsernameGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [usernames, setUsernames] = useState<UsernameStatus[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const generateUsernames = (count = 10) => {
    setIsGenerating(true)
    const templates = usernameTemplates[platform][style]
    const newUsernames: UsernameStatus[] = []

    for (let i = 0; i < count; i++) {
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
      const randomNum = Math.floor(Math.random() * 999) + 1

      const variations = [
        randomTemplate,
        `${randomTemplate}${randomNum}`,
        `${randomTemplate}_${randomNum}`,
        randomTemplate.replace(/\d+/g, String(randomNum)),
      ]

      const finalUsername = variations[Math.floor(Math.random() * variations.length)]

      newUsernames.push({
        username: finalUsername,
        status: "unchecked",
        message: "Not checked yet",
      })
    }

    setUsernames(newUsernames)
    setIsGenerating(false)
  }

  const checkAllAvailability = async () => {
    if (usernames.length === 0) return

    setIsChecking(true)

    const updatedUsernames = [...usernames]

    // First mark all as pending
    for (let i = 0; i < updatedUsernames.length; i++) {
      updatedUsernames[i] = {
        ...updatedUsernames[i],
        status: "pending",
        message: "Checking...",
      }
    }
    setUsernames(updatedUsernames)

    // Then check each one with a small delay to avoid rate limiting
    for (let i = 0; i < updatedUsernames.length; i++) {
      const result = await simulateAvailabilityCheck(updatedUsernames[i].username, platform)
      updatedUsernames[i] = {
        ...updatedUsernames[i],
        status: result.status,
        message: result.message,
      }
      setUsernames([...updatedUsernames])

      // Small delay between checks
      if (i < updatedUsernames.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }
    }

    setIsChecking(false)
  }

  const simulateAvailabilityCheck = async (username: string, platform: Platform) => {
    // Clean username for checking
    const cleanUsername = username.replace(/[^\w.-]/g, "").toLowerCase()

    if (!cleanUsername) {
      return {
        status: "error" as const,
        message: "Username contains only special characters",
      }
    }

    // Simulate a network request delay
    await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))

    // Simulate availability based on username characteristics
    const isLikelyTaken =
      cleanUsername.length < 4 ||
      /^(admin|test|user|name|cool|best|pro|top|new)/.test(cleanUsername) ||
      /\d{1,3}$/.test(cleanUsername) // ends with 1-3 digits

    const random = Math.random()

    if (isLikelyTaken && random > 0.3) {
      return {
        status: "taken" as const,
        message: `Likely taken on ${platforms.find((p) => p.id === platform)?.name}`,
      }
    } else if (random > 0.7) {
      return {
        status: "available" as const,
        message: `Appears available on ${platforms.find((p) => p.id === platform)?.name}!`,
      }
    } else {
      return {
        status: "unknown" as const,
        message: `Unable to verify on ${platforms.find((p) => p.id === platform)?.name}`,
      }
    }
  }

  const copyUsername = (username: string) => {
    navigator.clipboard.writeText(username)
    toast({
      title: "Copied!",
      description: "Username copied to clipboard",
    })
  }

  const getStatusColor = (status: UsernameStatus["status"]) => {
    switch (status) {
      case "available":
        return "border-green-500 bg-green-50 dark:bg-green-950/30"
      case "taken":
        return "border-red-500 bg-red-50 dark:bg-red-950/30"
      case "pending":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
      case "unchecked":
        return "border-gray-200 dark:border-gray-800"
      default:
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
    }
  }

  const getStatusIcon = (status: UsernameStatus["status"]) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "taken":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
      case "unchecked":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true)
          generateUsernames()
        }}
        variant="outline"
        className="w-full border-purple-500/50 hover:bg-purple-500/10"
      >
        Bulk Generate & Check
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bulk Username Generator
            </DialogTitle>
            <DialogDescription>Generate and check availability for multiple usernames at once</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {platforms.find((p) => p.id === platform)?.icon} {platforms.find((p) => p.id === platform)?.name} •{" "}
                {styles.find((s) => s.id === style)?.name}
              </Badge>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => generateUsernames()} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  onClick={checkAllAvailability}
                  disabled={isChecking || usernames.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check All"
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {usernames.map((item, index) => (
                <Card key={index} className={`p-3 flex items-center justify-between ${getStatusColor(item.status)}`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="font-mono">{item.username}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden sm:inline">{item.message}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyUsername(item.username)}
                      title="Copy username"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {usernames.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Generating usernames...</p>
                  </div>
                ) : (
                  <p>No usernames generated yet</p>
                )}
              </div>
            )}

            <div className="text-xs text-muted-foreground text-center mt-4">
              <p>Availability results are simulated and may not reflect actual availability.</p>
              <p>Always verify manually before creating accounts.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
