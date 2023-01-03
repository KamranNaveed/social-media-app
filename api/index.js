
const express = require("express");
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer")
const path = require("path")
const cors = require("cors");
const { nextTick } = require("process");

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO, {useNewUrlParser: true}, ()=>{
    console.log("Connected to Database")
})


//middleware
app.use(cors({
    origin: ["https://localhost:3000", "https://kamisocial.onrender.com"]
}))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

//Do not recommend uploading files to server. Server should only handle REST calls. This is only for demonstration
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"public/images")
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("File uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})


app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(process.env.PORT, () => {
    console.log("Backend server running")
})

