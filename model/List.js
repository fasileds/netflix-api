

const mongoose =require("mongoose")
const listsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String
    },
    genra:{
        type:String
    },
    content:{
        type:Array,
        default:""
    }

},
{timeStamps:true}
)
module.exports= mongoose.model("Lists",listsSchema)