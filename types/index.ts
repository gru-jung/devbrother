export interface IPost {
  postId: string
  imageURL: string
  userName: string
  likes: number
  comments: number
  isLiked?: boolean
  isScrapped?: boolean
  prompt?: string
  createdAt: string
}

export interface IComment {
  id: string
  content: string
  userName: string
  createdAt: string
} 