import { MoreVert } from '@mui/icons-material'
import './post.css'
import { Users } from "../../dummyData"
import { useState } from 'react'


function Post({post}) {

    const [like, setLike] = useState(post?.like || 0)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1: like + 1)
        setIsLiked(!isLiked)
    }

  return (
    <div className='postContainer'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={Users.filter(user=>user?.id===post?.userId)[0]?.profilePicture} className='postProfileImg' alt="Profile" />
                    <span className="postUsername">{Users.filter(user=>user?.id===post?.userId)[0]?.username}</span>
                    <span className="postDate">{post?.date}</span>
                </div>
                <div className="postTopRight">
                     <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src = {post?.photo} alt="post" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="./assets/like.png" alt="like" className="likeIcon" onClick={likeHandler} />
                    <img src="./assets/heart.png" alt="heart" className="likeIcon" onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post?.comment} comments</span>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Post
