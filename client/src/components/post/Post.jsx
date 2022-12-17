import { MoreVert } from '@mui/icons-material'
import './post.css'

function Post({post}) {
  return (
    <div className='postContainer'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src="assets/person/1.jpeg" className='postProfileImg' alt="Profile" />
                    <span className="postUsername">John Doe</span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                     <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img src="./assets/post/1.jpeg" alt="post" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="./assets/like.png" alt="like" className="likeIcon" />
                    <img src="./assets/heart.png" alt="heart" className="likeIcon" />
                    <span className="postLikeCounter">32 people like this</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">9 comments</span>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Post
