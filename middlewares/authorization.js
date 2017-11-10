
'use strict'
function isAuthorization(req,res,next){
    console.log(req.headers.codeauthorization)
      if(!req.headers.codeauthorization){
         return res.status(403).send({code:1,message:'Sin Autorización Al Sistema'})
    }
    
    const token =req.headers.codeauthorization
   if(token=='QU5ERVJTT05AR01BSUwuQ09NOjEyMzQ1Njc4OQ=='){

    next()
   }else {
    return res.status(403).send({code:1,message:'Sin Autorización Al Sistema'})
   }

}
module.exports=isAuthorization
