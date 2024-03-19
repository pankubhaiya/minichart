
const Auth = (req,res,next)=>{
   if(req.body.role == "Admin"){
    next()
   }else{
     return res.send({mes:"you are not auther"})
   }
}

const Authentication = ()=>{

}