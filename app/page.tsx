"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CommunityFeed from "@/components/CommunityFeed"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const router = useRouter()
  
  const handleGenerateImage = () => {
    // 프롬프트를 URL 파라미터로 전달
    router.push(`/generate?prompt=${encodeURIComponent(prompt)}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 프롬프트 입력 섹션 */}
      <section className="max-w-2xl mx-auto mb-16">
        <div className="space-y-4">
          <Input
            placeholder="이미지를 생성할 프롬프트를 입력하세요..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full"
          />
          <Button 
            onClick={handleGenerateImage}
            disabled={!prompt.trim()}
            className="w-full"
          >
            이미지 생성하기
          </Button>
        </div>
      </section>

      {/* 커뮤니티 피드 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-8">커뮤니티 피드</h2>
        <CommunityFeed />
      </section>
    </main>
  )
}
