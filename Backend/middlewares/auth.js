import jwt from "jsonwebtoken"

const auth = async(req,res,next)=>{
    let token= req.header("Authorization");
    if(!token)
    return res.status(400).send({message:"authorization denied: no token"});

    token=token.split(" ")[1];
    if(!token)return res.status(400).send({message:"authorization denied: no token"})
    try {
        req.user=jwt.verify(token,process.env.KEY_JWT);
        next();
    } catch (error) {
        return res.status(400)
      .send({ message: "Authorization denied: Invalid token" });
    }
}

export default auth;