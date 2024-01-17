

const mongoose =require("mongoose")
const moviesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,

    },
    image:{
        type:String,

    },
    imageTitel:{
        type:String,

    },
    imageSmale:{
        type:String,

    },
    trialer:{
        type:String,
    },
    video:{
        type:String
    },
    year:{
        type:Number
    },
    genra:{
        type:String
    },
    isSeries:{
        type:Boolean,
        default:false
    }

},
{timeStamps:true}
)
module.exports= mongoose.model("Movie",moviesSchema)