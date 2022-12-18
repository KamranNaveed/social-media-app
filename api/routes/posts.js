const router = require("express").Router()
const Post = require("../models/Post.js")
const User = require("../models/User.js")

//create a post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


//update a post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json("Post successfully updated")
        } else {
            res.status(403).json("You can only update your own posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete a post
router.delete("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("Post successfully deleted")
        } else {
            res.status(403).json("You can only delete your own posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//like a post
router.put("/:id/like", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            res.status(200).json("You have liked this post")
        } else {
            await post.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json("You have disliked this post")

        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//get a post
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(200)
    }

})

//get timeline posts
router.get("/timeline/all", async (req,res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const followingPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...followingPosts))
    } catch (error) {
        res.status(500).json(200)
    }

})
module.exports = router