const router = require("express").Router()
const CryptoJS= require("crypto-js")
const jwt = require("jsonwebtoken")

const User = require("../model/User")

//register
router.post("/register",async(req,res)=>{
    try {
        const newUser  = await new User({
            userName:req.body.username,
            emaile:req.body.emaile,
            password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
            passwordConiforem:req.body.passwordConiforem,
            profilePicture:req.body.profilePicture
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }

});

//login
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({
            emaile:req.body.emaile
        })
        !user && res.status(404).json("the user dosenot exist")
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const asscesToken=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"})
        if(originalText !==req.body.password){
            res.status(404).json("the user doesonot exis or the password dosenot much")

        }else{
            const{password,...info} = user._doc;
            res.status(200).json({...info,asscesToken})
        }

     

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=router
 