const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//REGISTER
router.post("/register", async (req,res)=>{
    
    try {

        //generate hashed password
        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
        
        //create new user

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN

router.post("/login", async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
         if (!user){
            res.status(404).json("User not found!")
        }
        const validPassword = await bcrypt.compareSync(req.body.password, user.password)
        if(!validPassword){
            res.status(400).json("Wrong Password!")
        }

        res.status(200).json(user)


    } catch (error) {
        res.status(500).json(err)
    }   
})


module.exports = router