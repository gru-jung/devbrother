"use client"

import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Bookmark, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { IPost, IComment } from "@/types"
import CommentSection from "./CommentSection"

// 목업 데이터
const MOCK_POST: IPost = {
  postId: "1",
  imageURL: "https://picsum.photos/seed/1/1200/1200",
  userName: "창작자1",
  likes: 42,
  comments: 5,
  isLiked: false,
  isScrapped: false,
  prompt: "A serene landscape with mountains and a lake at sunset",
  createdAt: "2024-01-15T09:00:00.000Z"
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(MOCK_POST)

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked
    }))
  }

  const handleScrap = () => {
    setPost(prev => ({
      ...prev,
      isScrapped: !prev.isScrapped
    }))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push('/')}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        메인으로 돌아가기
      </Button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 이미지 섹션 */}
        <div className="relative aspect-square rounded-lg overflow-hidden sticky top-8">
          <Image
            src={post.imageURL}
            alt="Generated image"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 오른쪽: 정보 섹션 */}
        <div className="flex flex-col">
          {/* 작성자 및 상호작용 섹션 */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={`https://api.dicebear.com/7.x/personas/jpg?seed=${post.userName}`}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium">{post.userName}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2 hover:text-red-500"
              >
                <Heart
                  size={20}
                  className={post.isLiked ? "fill-red-500 text-red-500" : ""}
                />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleScrap}
                className="flex items-center gap-2"
              >
                <Bookmark
                  size={20}
                  className={post.isScrapped ? "fill-current" : ""}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          {/* 프롬프트 정보 섹션 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="font-medium mb-2">프롬프트 정보</h3>
            <p className="text-gray-700">{post.prompt}</p>
          </div>

          {/* 댓글 섹션 */}
          <div className="flex-1">
            <CommentSection postId={post.postId} />
          </div>
        </div>
      </div>
    </main>
  )
} 