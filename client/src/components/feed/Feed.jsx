import { useEffect, useState } from "react"
import axios from 'axios'
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"


function Feed({username}) {
  const [posts, setPosts] = useState([])
  
  //render feed
  useEffect(()=>{
    const fetchPosts = async () => {
      const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("/posts/timeline/639e1e4fe3392026657c0d77")
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <Share/>
        {posts?.map((post)=>(
          <Post key={post._id} post={post}/>
        ))}
        <Post/>
      </div>
    </div>
  )
}

export default Feed
