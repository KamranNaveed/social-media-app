import { MoreVert } from '@mui/icons-material'
import './post.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'


function Post({post}) {

    const [like, setLike] = useState(post?.like || 0)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=>{
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post?.userId}`)
          setUser(res.data)
        }
        fetchUser()
      }, [post?.userId])
    

    const likeHandler = () => {
        setLike(isLiked ? like - 1: like + 1)
        setIsLiked(!isLiked)
    }


  return (
    <div className='postContainer'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user?.profilePicture || PF+"person/noAvatar.png"} className='postProfileImg' alt="Profile" />
                    </Link>
                    <span className="postUsername">{user?.username}</span>
                    <span className="postDate">{format(post?.createdAt)}</span>
                </div>
                <div className="postTopRight">
                     <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                {post?.img && <img src = {PF+post.img} alt="" className="postImg" />}
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="like" className="likeIcon" onClick={likeHandler} />
                    <img src={`${PF}heart.png`} alt="heart" className="likeIcon" onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post?.comment || 0} comments</span>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Post
