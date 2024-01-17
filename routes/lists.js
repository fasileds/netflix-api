const router = require("express").Router()

const List = require("../model/List")
const verify = require("../varifyToken");
//create post
router.post("/createList",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newList =  new List(req.body)
        try {
            const savedList= await newList.save()
            res.status(200).json(savedList)
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
              await List.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted succesfully")
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(500).json("you are not allowed")
    }
})
//get 
router.get("/",verify,async(req,res)=>{
    const typequrey = req.query.type
    const genraqurey = req.query.genra
    let list = []

        try {
            if(typequrey){
                if(genraqurey){
                    list = await List.aggregate([{
                        $sample:{size:10}
                    },
                {$match:{type:typequrey,genra:genraqurey}}])
                }else{
                    list = await List.aggregate([{
                        $sample:{size:10}
                    },
                {$match:{type:typequrey}}])
                }

            }else{
                list=await List.aggregate([{$sample:{size:10}}])
            
            }
          
            //const lists=  await List.find()
            res.status(200).json(list)
        } catch (error) {
            res.status(500).json(error)
        }

    
})

module.exports = router