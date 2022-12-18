
const express = require("express");
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO, {useNewUrlParser: true}, ()=>{
    console.log("Connected to Database")
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(process.env.PORT, () => {
    console.log("Backend server running")
})