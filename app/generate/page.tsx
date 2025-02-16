"use client"

import { useSearchParams } from "next/navigation"

export default function GeneratePage() {
  const searchParams = useSearchParams()
  const prompt = searchParams.get("prompt")

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">이미지 생성</h1>
      <p>입력된 프롬프트: {prompt}</p>
      {/* TODO: 이미지 생성 UI 구현 */}
    </main>
  )
} 