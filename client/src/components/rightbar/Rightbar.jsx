import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Add, FireTruckRounded, Remove } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext"

function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const {user:currentUser, dispatch} = useContext(AuthContext)
  const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id) || false)


  useEffect(()=>{
    setFollowed(currentUser?.followings?.includes(user?._id))
  }, [currentUser, user?._id])

  useEffect(()=>{
    const getFriends = async ()=>{
      try {
        const friendsList = await axios.get("/users/friends/" + user?._id)
        setFriends(friendsList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }, [user])

  const followHandler = async () =>{
    try {
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow", {userId:currentUser._id})
        dispatch({type:"UNFOLLOW", payload: user._id})
      } else {
        await axios.put("/users/"+user._id+"/follow", {userId:currentUser._id})
        dispatch({type:"FOLLOW", payload: user._id})
      }
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed)
    console.log(followed)
  }

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <img src="./assets/gift.png" alt="Birthday" className="birthdayImg" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have their birthdays today</span>
        </div>
        <img src="./assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => (
            <Online key={user.id} user={user}/>
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return(
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed ? "Unfollow" : "Follow" }
          {followed ? <Remove/> : <Add/>  }
        </button>
      )}
      <h4 className="rightbarTitle">User Information Title</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship</span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend)=> (
          <Link key={friend._id} style={{textDecoration: "none"}} to={"/profile/"+friend.username}>
            <div className="rightbarFollowing">
              <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
    )
    
  }

  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
