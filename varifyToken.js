const jwt = require("jsonwebtoken")

function verify(req,res,next){
const authHeder = req.headers.token;
if(authHeder){
const token = authHeder.split(" ")[1]
jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
    if(err){
        res.status(403).json("token not valide")
    }else{
        req.user=user
        next()
    }
})
}else{
    return res.status(401).json("you ara not authenticated")
}
}
module.exports = verify