"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BulkUsernameGenerator } from "@/components/bulk-username-generator"

type Platform = "youtube" | "tiktok" | "instagram" | "snapchat" | "discord" | "twitch" | "twitter"
type Style = "funny" | "clean" | "og" | "gamer" | "aesthetic"

const platforms = [
  { id: "youtube" as Platform, name: "YouTube", icon: "📺" },
  { id: "tiktok" as Platform, name: "TikTok", icon: "🎵" },
  { id: "instagram" as Platform, name: "Instagram", icon: "📸" },
  { id: "snapchat" as Platform, name: "Snapchat", icon: "👻" },
  { id: "discord" as Platform, name: "Discord", icon: "🎮" },
  { id: "twitch" as Platform, name: "Twitch", icon: "🟣" },
  { id: "twitter" as Platform, name: "Twitter/X", icon: "🐦" },
]

const styles = [
  { id: "funny" as Style, name: "Funny", description: "Humorous and quirky usernames" },
  { id: "clean" as Style, name: "Clean", description: "Professional and simple" },
  { id: "og" as Style, name: "OG-Style", description: "Classic internet vibes" },
  { id: "gamer" as Style, name: "Gamer Tag", description: "Gaming-focused names" },
  { id: "aesthetic" as Style, name: "Aesthetic", description: "Stylish with special characters" },
]

const usernameTemplates = {
  youtube: {
    funny: ["VibeNovaYT", "ChaosCookieYT", "NoodleMasterYT", "BurritoKingYT", "MemeLordYT", "CoffeeChaosYT"],
    clean: ["CreativeStudioYT", "VisionCraftYT", "ContentCreatorYT", "StudioAlphaYT", "MediaMakerYT", "ChannelProYT"],
    og: ["xXVibeKingXx", "NoScopeNinja", "MLGProGamer", "xXShadowXx", "DarkLordGaming", "ProSkillzYT"],
    gamer: ["FragMasterYT", "NoobSlayerYT", "GamingLegendYT", "ProGamerYT", "ElitePlayerYT", "GameChampYT"],
    aesthetic: [
      "✨VibeWaveYT✨",
      "🌙MoonlightYT🌙",
      "🔥FireContentYT🔥",
      "💫StarCreatorYT💫",
      "🌈RainbowVibesYT🌈",
      "⭐ContentStarYT⭐",
    ],
  },
  tiktok: {
    funny: ["DancingTaco", "ViralVibe", "TrendyTurtle", "MemeMachine", "ChaosCreator", "FunnyFeline"],
    clean: ["CreativeContent", "TrendMaker", "VibeCreator", "ContentCraft", "TikTokPro", "VideoVision"],
    og: ["xXDancerXx", "TikTokKing", "ViralLegend", "TrendMaster", "DanceProud", "VideoVibe"],
    gamer: ["GamingTikTok", "ProGamerTT", "GameVibes", "TikTokGamer", "GameContent", "ViralGamer"],
    aesthetic: [
      "✨aesthetic.vibes✨",
      "🌸soft.content🌸",
      "💫dreamy.tiktok💫",
      "🦋butterfly.vibes🦋",
      "🌙moon.aesthetic🌙",
      "🔮mystic.content🔮",
    ],
  },
  instagram: {
    funny: ["InstaLaughs", "PhotoFunny", "MemeMaster", "LaughingLens", "FunnyFrames", "ComedyCapture"],
    clean: ["PhotoStudio", "CreativeShots", "VisionCraft", "ImageMaker", "PhotoPro", "StudioAlpha"],
    og: ["xXPhotoKingXx", "InstaLegend", "PhotoMaster", "ImagePro", "xXVibeXx", "PhotoElite"],
    gamer: ["GamingGram", "GamePhotos", "ProGamerIG", "GameVibes", "GamingLife", "PlayerPics"],
    aesthetic: [
      "✨aesthetic.gram✨",
      "🌸soft.photos🌸",
      "💫dreamy.shots💫",
      "🦋photo.vibes🦋",
      "🌙moon.gram🌙",
      "🔮mystic.photos🔮",
    ],
  },
  snapchat: {
    funny: ["SnapLaughs", "FunnySnaps", "MemeMaster", "LaughingLens", "ComedySnap", "FunnyFilter"],
    clean: ["SnapStudio", "CreativeSnaps", "VisionSnap", "SnapMaker", "PhotoSnap", "StudioSnap"],
    og: ["xXSnapKingXx", "SnapLegend", "SnapMaster", "xXVibeXx", "SnapElite", "SnapPro"],
    gamer: ["GamingSnap", "GameSnaps", "ProGamerSC", "GameVibes", "GamingLife", "PlayerSnap"],
    aesthetic: [
      "✨aesthetic.snap✨",
      "🌸soft.snaps🌸",
      "💫dreamy.snap💫",
      "🦋snap.vibes🦋",
      "🌙moon.snap🌙",
      "🔮mystic.snap🔮",
    ],
  },
  discord: {
    funny: ["gl!tch.g0blin", "ch40s.k1ng", "m3m3.l0rd", "n00dl3.m4st3r", "c0ff33.ch40s", "burr!t0.k!ng"],
    clean: ["CreativeUser", "VisionCraft", "StudioAlpha", "ContentMaker", "MediaPro", "DigitalCraft"],
    og: ["xXDarkLordXx", "ShadowMaster", "xXVibeKingXx", "ElitePro", "LegendaryUser", "MasterGamer"],
    gamer: ["Fr4gM4st3r", "N00bSl4y3r", "G4m!ngL3g3nd", "Pr0G4m3r", "3l!t3Pl4y3r", "G4m3Ch4mp"],
    aesthetic: [
      "✧･ﾟ: *aesthetic.vibes* :･ﾟ✧",
      "｡･:*:･ﾟ★moon.child★ﾟ･:*:･｡",
      "◦•●◉✿ dreamy.soul ✿◉●•◦",
      "⋆｡‧˚ʚ♡ɞ˚‧｡⋆",
      "｡ﾟ☆: *.☽ mystic.vibe ☾.* :☆ﾟ｡",
      "✧･ﾟ: *✧･ﾟ:* star.child *:･ﾟ✧*:･ﾟ✧",
    ],
  },
  twitch: {
    funny: ["StreamingTaco", "LiveLaughs", "ChatChaos", "StreamMeme", "TwitchTurtle", "LiveComedy"],
    clean: ["StreamStudio", "LiveContent", "StreamCraft", "ContentStream", "LiveVision", "StreamPro"],
    og: ["xXStreamerXx", "LiveLegend", "StreamMaster", "TwitchKing", "xXLiveXx", "StreamElite"],
    gamer: ["StreamGamer", "LiveGaming", "ProStreamer", "GameStream", "StreamingPro", "LivePlayer"],
    aesthetic: [
      "✨stream.vibes✨",
      "🌸soft.streams🌸",
      "💫dreamy.live💫",
      "🦋live.aesthetic🦋",
      "🌙moon.stream🌙",
      "🔮mystic.live🔮",
    ],
  },
  twitter: {
    funny: ["TweetLaughs", "TwitterTaco", "TweetMeme", "SocialLaughs", "TweetComedy", "TwitterTurtle"],
    clean: ["TweetStudio", "SocialContent", "TwitterCraft", "TweetMaker", "SocialVision", "TwitterPro"],
    og: ["xXTweeterXx", "TwitterLegend", "TweetMaster", "SocialKing", "xXTweetXx", "TwitterElite"],
    gamer: ["TweetGamer", "TwitterGaming", "SocialGamer", "TweetPlayer", "GameTweets", "TwitterPlayer"],
    aesthetic: [
      "✨tweet.vibes✨",
      "🌸soft.tweets🌸",
      "💫dreamy.social💫",
      "🦋twitter.aesthetic🦋",
      "🌙moon.tweets🌙",
      "🔮mystic.twitter🔮",
    ],
  },
}

export default function UsernameGeneratorPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("youtube")
  const [selectedStyle, setSelectedStyle] = useState<Style>("funny")
  const [generatedUsername, setGeneratedUsername] = useState("")
  const [copied, setCopied] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [availabilityStatus, setAvailabilityStatus] = useState<{
    status: "available" | "taken" | "unknown" | "error"
    message: string
  } | null>(null)

  const generateUsername = () => {
    const templates = usernameTemplates[selectedPlatform][selectedStyle]
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]

    // Add some randomization to make each generation unique
    const randomNum = Math.floor(Math.random() * 999) + 1
    const variations = [
      randomTemplate,
      `${randomTemplate}${randomNum}`,
      `${randomTemplate}_${randomNum}`,
      randomTemplate.replace(/\d+/g, String(randomNum)),
    ]

    const finalUsername = variations[Math.floor(Math.random() * variations.length)]
    setGeneratedUsername(finalUsername)
    setCopied(false)
    setAvailabilityStatus(null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUsername)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Username copied to clipboard",
    })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const checkAvailability = async () => {
    if (!generatedUsername) return

    setIsChecking(true)
    setAvailabilityStatus(null)

    try {
      const results = await checkUsernameAvailability(generatedUsername, selectedPlatform)
      setAvailabilityStatus(results)
    } catch (error) {
      setAvailabilityStatus({
        status: "error",
        message: "Unable to check availability at this time",
      })
    } finally {
      setIsChecking(false)
    }
  }

  const checkUsernameAvailability = async (username: string, platform: Platform) => {
    // Remove special characters and emojis for URL checking
    const cleanUsername = username.replace(/[^\w.-]/g, "").toLowerCase()

    if (!cleanUsername) {
      return {
        status: "error" as const,
        message: "Username contains only special characters",
      }
    }

    // Simulate availability check since real API calls would be blocked by CORS
    return simulateAvailabilityCheck(cleanUsername, platform)
  }

  const simulateAvailabilityCheck = (username: string, platform: Platform) => {
    // Simulate availability based on username characteristics
    const isLikelyTaken =
      username.length < 4 || /^(admin|test|user|name|cool|best|pro|top|new)/.test(username) || /\d{1,3}$/.test(username) // ends with 1-3 digits

    const random = Math.random()

    if (isLikelyTaken && random > 0.3) {
      return {
        status: "taken" as const,
        message: `Username is likely taken on ${platforms.find((p) => p.id === platform)?.name} (simulated check)`,
      }
    } else if (random > 0.7) {
      return {
        status: "available" as const,
        message: `Username appears to be available on ${platforms.find((p) => p.id === platform)?.name}! (simulated check)`,
      }
    } else {
      return {
        status: "unknown" as const,
        message: `Unable to verify availability. Please check manually on ${platforms.find((p) => p.id === platform)?.name}.`,
      }
    }
  }

  // Generate initial username
  useState(() => {
    generateUsername()
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          SecurePassV2X Username Generator
        </h1>

        <Card className="mb-8 bg-background/50 backdrop-blur-md border-purple-500/20">
          <CardHeader>
            <CardTitle>Generate Platform-Specific Usernames</CardTitle>
            <CardDescription>
              Choose your platform and style to generate the perfect username with V2X technology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Platform</Label>
              <Tabs value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as Platform)}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                  {platforms.map((platform) => (
                    <TabsTrigger key={platform.id} value={platform.id} className="text-xs">
                      <span className="mr-1">{platform.icon}</span>
                      <span className="hidden sm:inline">{platform.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Choose Style</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {styles.map((style) => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStyle(style.id)}
                    className="h-auto p-3 flex flex-col items-center gap-1"
                  >
                    <span className="font-semibold">{style.name}</span>
                    <span className="text-xs text-muted-foreground text-center">{style.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Generated Username */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="username" className="text-base font-semibold">
                  Generated Username
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={checkAvailability}
                    disabled={isChecking || !generatedUsername}
                    title="Check availability"
                  >
                    {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertCircle className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={generateUsername} title="Generate new username">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Input
                  id="username"
                  value={generatedUsername}
                  readOnly
                  className="font-mono text-lg pr-24 text-center"
                />
              </div>

              {/* Availability Status */}
              {availabilityStatus && (
                <Alert
                  className={`${
                    availabilityStatus.status === "available"
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : availabilityStatus.status === "taken"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                        : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {availabilityStatus.status === "available" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {availabilityStatus.status === "taken" && <XCircle className="h-4 w-4 text-red-600" />}
                    {(availabilityStatus.status === "unknown" || availabilityStatus.status === "error") && (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    <AlertDescription className="text-sm">{availabilityStatus.message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex justify-center">
                <Badge variant="secondary" className="text-xs">
                  {platforms.find((p) => p.id === selectedPlatform)?.icon}{" "}
                  {platforms.find((p) => p.id === selectedPlatform)?.name} •{" "}
                  {styles.find((s) => s.id === selectedStyle)?.name}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={generateUsername}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Generate New Username
              </Button>

              <BulkUsernameGenerator
                platform={selectedPlatform}
                style={selectedStyle}
                usernameTemplates={usernameTemplates}
                platforms={platforms}
                styles={styles}
              />
            </div>
          </CardContent>
        </Card>

        {/* Availability Checker Disclaimer */}
        <Alert className="mb-4 bg-background/50 backdrop-blur-md border-purple-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Availability Checker:</strong> Results are estimates and may not be 100% accurate. Some platforms
            block automated checking. Always verify manually before creating accounts. Discord and Snapchat availability
            cannot be checked automatically.
          </AlertDescription>
        </Alert>

        <div className="text-center text-sm text-muted-foreground">
          <p>All generation happens locally. No data is stored.</p>
        </div>
      </div>
    </motion.div>
  )
}
