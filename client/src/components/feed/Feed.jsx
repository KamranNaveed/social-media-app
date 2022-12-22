import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import { AuthContext } from "../../context/AuthContext"


function Feed({username}) {
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)
  
  //render feed
  useEffect(()=>{
    const fetchPosts = async () => {
      const res = username ? await axios.get(`/posts/profile/${username}`) : await axios.get(`/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1,p2)=>{
        //sort posts according to newer first
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts()
  }, [username, user._id])

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <Share/>
        {posts?.map((post)=>(
          <Post key={post?._id} post={post}/>
        ))}
        <Post/>
      </div>
    </div>
  )
}

export default Feed
