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

export interface ICommunityFeedCardProps {
  post: IPost
  onLike: () => void
  onComment: () => void
}

export interface ICommentModalProps {
  isOpen: boolean
  onClose: () => void
  post: IPost | null
  comments: IComment[]
  onAddComment: (postId: string, content: string) => void
} 