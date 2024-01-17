

const mongoose =require("mongoose")
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    emaile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    passwordConiforem:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String
    },

},
{timeStamps:true}
)
module.exports= mongoose.model("User",userSchema)