import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { IPost } from "@/types"
import { useRouter } from "next/navigation"

interface ICommunityFeedCardProps {
  post: IPost
  onLike: () => void
  onComment: () => void
}

export default function CommunityFeedCard({ post, onLike, onComment }: ICommunityFeedCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/post/${post.postId}`)
  }

  return (
    <Card className="overflow-hidden cursor-pointer group">
      <div onClick={handleCardClick}>
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={post.imageURL}
              alt="Generated image"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        <div className="flex justify-between items-center w-full">
          <span 
            className="font-medium cursor-pointer hover:underline" 
            onClick={handleCardClick}
          >
            {post.userName}
          </span>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation()
                onLike()
              }}
              className="flex items-center space-x-1 hover:text-red-500"
            >
              <Heart size={16} className={post.isLiked ? "fill-red-500 text-red-500" : ""} />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onComment()
              }}
              className="flex items-center space-x-1"
            >
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 