import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import axios from 'axios'
import { useState } from 'react'
import { useContext, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import'./share.css'

function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e)=>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file){
            const data = new FormData();
            const fileName = Date.now() + file.name 
            data.append("file", file, fileName)
            newPost.img = fileName
            try {
                await axios.post("/upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axios.post("/posts", newPost)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='shareContainer'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user?.profilePicture ? PF +user?.profilePicture : PF +"person/noAvatar.png"} alt="Profile" className="shareProfileImg" />
                <input type="text" placeholder={"What's on your mind? "+user?.username} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="File to be shared" className="shareImg" />
                    <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display: "none"}} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
      
    </div>
  )
}

export default Share
