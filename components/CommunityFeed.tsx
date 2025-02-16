"use client"

import { useState } from "react"
import CommunityFeedCard from "./CommunityFeedCard"
import CommentModal from "./CommentModal"
import { IPost, IComment } from "@/types"

// 목업 데이터
const MOCK_POSTS = [
  {
    postId: "1",
    imageURL: "https://picsum.photos/seed/1/400/400",
    userName: "창작자1",
    likes: 42,
    comments: 5
  },
  {
    postId: "2",
    imageURL: "https://picsum.photos/seed/2/400/400",
    userName: "창작자2",
    likes: 31,
    comments: 3
  },
  {
    postId: "3",
    imageURL: "https://picsum.photos/seed/3/400/400",
    userName: "창작자3",
    likes: 28,
    comments: 7
  },
  {
    postId: "4",
    imageURL: "https://picsum.photos/seed/4/400/400",
    userName: "창작자4",
    likes: 56,
    comments: 8
  },
  {
    postId: "5",
    imageURL: "https://picsum.photos/seed/5/400/400",
    userName: "창작자5",
    likes: 39,
    comments: 4
  },
  {
    postId: "6",
    imageURL: "https://picsum.photos/seed/6/400/400",
    userName: "창작자6",
    likes: 45,
    comments: 6
  },
  {
    postId: "7",
    imageURL: "https://picsum.photos/seed/7/400/400",
    userName: "창작자7",
    likes: 33,
    comments: 2
  },
  {
    postId: "8",
    imageURL: "https://picsum.photos/seed/8/400/400",
    userName: "창작자8",
    likes: 51,
    comments: 9
  },
  {
    postId: "9",
    imageURL: "https://picsum.photos/seed/9/400/400",
    userName: "창작자9",
    likes: 47,
    comments: 5
  },
  {
    postId: "10",
    imageURL: "https://picsum.photos/seed/10/400/400",
    userName: "창작자10",
    likes: 38,
    comments: 4
  }
]

// 목업 댓글 데이터
const MOCK_COMMENTS: Record<string, IComment[]> = {
  "1": [
    { id: "1", content: "멋진 작품이네요!", userName: "댓글러1", createdAt: "2024-01-01" },
    { id: "2", content: "어떤 프롬프트를 사용하셨나요?", userName: "댓글러2", createdAt: "2024-01-02" }
  ],
  "2": [
    { id: "3", content: "색감이 너무 예쁘네요", userName: "댓글러3", createdAt: "2024-01-01" }
  ],
  "3": [
    { id: "4", content: "분위기가 독특해요!", userName: "댓글러4", createdAt: "2024-01-01" },
    { id: "5", content: "저도 비슷한 걸 만들어보고 싶어요", userName: "댓글러5", createdAt: "2024-01-02" }
  ],
  "4": [
    { id: "6", content: "구도가 멋있네요", userName: "댓글러6", createdAt: "2024-01-01" }
  ],
  "5": [
    { id: "7", content: "프롬프트 공유 부탁드려요!", userName: "댓글러7", createdAt: "2024-01-01" }
  ],
  "6": [
    { id: "8", content: "이런 스타일 좋아해요", userName: "댓글러8", createdAt: "2024-01-01" }
  ],
  "7": [
    { id: "9", content: "참신한 아이디어네요", userName: "댓글러9", createdAt: "2024-01-01" }
  ],
  "8": [
    { id: "10", content: "디테일이 살아있어요", userName: "댓글러10", createdAt: "2024-01-01" }
  ],
  "9": [
    { id: "11", content: "분위기가 좋네요", userName: "댓글러11", createdAt: "2024-01-01" }
  ],
  "10": [
    { id: "12", content: "색감 조합이 특이해요", userName: "댓글러12", createdAt: "2024-01-01" }
  ]
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [comments, setComments] = useState<Record<string, IComment[]>>(MOCK_COMMENTS)

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.postId === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleComment = (post: IPost) => {
    setSelectedPost(post)
    setIsCommentModalOpen(true)
  }

  const handleAddComment = (postId: string, content: string) => {
    const newComment: IComment = {
      id: Date.now().toString(),
      content,
      userName: "현재 사용자",
      createdAt: new Date().toISOString()
    }
    
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), newComment]
    }))
    
    setPosts(posts.map(post => {
      if (post.postId === postId) {
        return {
          ...post,
          comments: post.comments + 1
        }
      }
      return post
    }))
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <CommunityFeedCard 
            key={post.postId} 
            post={post}
            onLike={() => handleLike(post.postId)}
            onComment={() => handleComment(post)}
          />
        ))}
      </div>

      <CommentModal 
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={selectedPost}
        comments={selectedPost ? comments[selectedPost.postId] || [] : []}
        onAddComment={handleAddComment}
      />
    </>
  )
} 