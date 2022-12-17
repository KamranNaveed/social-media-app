import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {Posts} from "../../dummyData"

function Feed() {
  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <Share/>
        {Posts.map((post)=>(
          <Post key={post.id} post={post}/>
        ))}
        <Post/>
      </div>
    </div>
  )
}

export default Feed
