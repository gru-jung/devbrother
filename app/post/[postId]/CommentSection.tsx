"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IComment } from "@/types"
import Image from "next/image"

// 목업 댓글 데이터
const MOCK_COMMENTS: IComment[] = [
  { id: "1", content: "멋진 작품이네요!", userName: "댓글러1", createdAt: "2024-01-01" },
  { id: "2", content: "어떤 프롬프트를 사용하셨나요?", userName: "댓글러2", createdAt: "2024-01-02" }
]

interface ICommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: ICommentSectionProps) {
  const [comments, setComments] = useState<IComment[]>(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: IComment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      userName: "현재 사용자",
      createdAt: new Date().toISOString()
    }

    setComments(prev => [...prev, comment])
    setNewComment("")
  }

  return (
    <div>
      <h3 className="font-medium mb-4">댓글 {comments.length}개</h3>
      
      {/* 댓글 목록 */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={`https://api.dicebear.com/7.x/personas/jpg?seed=${comment.userName}`}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 입력 폼 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          작성
        </Button>
      </form>
    </div>
  )
} 