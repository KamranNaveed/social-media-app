
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
const cors = require("cors")

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO, {useNewUrlParser: true}, ()=>{
    console.log("Connected to Database")
})

app.use("/images", express.static(path.join(__dirname, "public/images")) )

//middleware
app.use(cors())
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

app.use(express.static(path.join(__dirname, 'build')));

// PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}