
'use strict'


const services=require('../services');


function isAuth(req,res,next){
    if(!req.headers.tokenauthorization){
   return res.status(403).send({code:1,message:'Sin Autorización Al Sistema'})

    }
    const token =req.headers.tokenauthorization
   services.decodeToken(token)
   .then(response=>{
    //   console.log('response')
     //  req.headers.tokenauthorization=response
       next()
   })
   .catch(response=>{
  //  console.log(response.status)
    return res.status(403).send({code:1,message:'Sin Autorización Al Sistema'})
   })

}
module.exports=isAuth
