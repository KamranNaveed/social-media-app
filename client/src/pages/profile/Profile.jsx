import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css"

function Profile() {
  return (
    <>
      <Topbar/>
      <div className="profileContainer">
        <Sidebar/>
        <div className="profileWrapperRight">
            <div className="profileWrapperRightTop">
                <div className="profileCover">
                    <img src="assets/post/3.jpeg" alt="" className="profileCoverImg" />
                    <img src="assets/person/7.jpeg" alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">John DOe</h4>
                    <span className="profileInfoDesc">Hello My friends</span>
                </div>
            </div>
            <div className="profileWrapperRightBottom">
                <Feed/>
                <Rightbar profile/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile
