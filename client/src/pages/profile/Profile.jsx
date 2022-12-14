import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css"
import { useEffect, useState } from "react";
import {useParams} from 'react-router'
import axios from "axios";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const username = useParams().username

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar/>
      <div className="profileContainer">
        <Sidebar/>
        <div className="profileWrapperRight">
            <div className="profileWrapperRightTop">
                <div className="profileCover">
                    <img src={user.coverPicture ? PF+user.coverPicture : PF+"/person/noCover.png"} alt="" className="profileCoverImg" />
                    <img src={user.profilePicture?  PF+user.profilePicture : PF+"/person/noAvatar.png"} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user?.username}</h4>
                    <span className="profileInfoDesc">{user?.desc}</span>
                </div>
            </div>
            <div className="profileWrapperRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
