const router = require("express").Router()

const Movies = require("../model/Movies");
const verify = require("../varifyToken");
//create post
router.post("/createPost",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movies(req.body)
        try {
            const savedMovies= await newMovie.save()
            res.status(200).json(savedMovies)
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(500).json("you are not allowed")
    }
})
//update movies
router.put("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const updatedMovies= await Movies.findBayIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedMovies)
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(500).json("you are not allowed")
    }
})

//delete

router.delete("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            await Movies.findBayIdAndDelete(req.params.id)
            res.status(200).json("the movie deleted succesfully")
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(500).json("you are not allowed")
    }
})

//get
router.get("/find/:id",async(req,res)=>{
        try {
            const movies= await Movies.findById(req.params.id)
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json(error)
        }

    
})

//get all movies
router.get("/",verify,async(req,res)=>{
    if(req.user.isAdmin){
    try {
        const movies= await Movies.find()
        res.status(200).json(movies.reverse())
    } catch (error) {
        res.status(500).json(error)
    }}else{
        res.status(500).json("you are not allowed")
    }


})

//get randome movies
router.get("/randome",async(req,res)=>{
    const type = req.query.type
    let movie;
    try {
        if(type==="series"){
            movie= await Movies.aggregate([
                {$match:{isSeries:true}},
                {$sample:{size:1}}
            ])

        }else{
            movie= await Movies.aggregate([
                {$match:{isSeries:false}},
                {$sample:{size:1}}
            ])
        }
        res.status(200).json(movie)

    } catch (error) {
        res.status(500).json(error)
    }


})

module.exports = router