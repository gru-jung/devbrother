"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { IPost, IComment } from "@/types"

interface ICommentModalProps {
  isOpen: boolean
  onClose: () => void
  post: IPost | null
  comments: IComment[]
  onAddComment: (postId: string, content: string) => void
}

export default function CommentModal({
  isOpen,
  onClose,
  post,
  comments,
  onAddComment
}: ICommentModalProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !newComment.trim()) return

    onAddComment(post.postId, newComment.trim())
    setNewComment("")
  }

  const handleClose = () => {
    setNewComment("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>댓글</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
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
      </DialogContent>
    </Dialog>
  )
} 