'use strcit'

const sqlapi = require('mssql')
const service=require('../Services')
const accessDataModel = require('../models/access_data')
const mail=require('../controllers/mail')
function VerificarCuenta(res,email,pass,array){
    var request = new sqlapi.Request()
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this);
    request.execute('sp_go_TC004_appMovil', function(err, result){
        if (err) {
            res.status(200).send({code:3,message:'La conexión ha sido interrumpida'})
        } else {
            // console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          // console.log(result.recordset[0]["code_id"]) // first recordset from result.recordsets 
          if(result.recordsets[0].length==1){
             
            res.status(200).send({code:0,message:'Usuario logueado exitosamente',token:service.createToken(result.recordset[0]["code_id"])})
          }else{
         
           res.status(200).send({code:4,message:'Datos inválidos. por favor inserte un correo y una contraseña válida'})
         
           }
        }
    }) 
}



function EjecutaProcedimiento(res,array,_codeExitoso,_codeError,_mensajeValida,_mesajeInvalido){
    var request = new sqlapi.Request()
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this);
 
    request.execute('sp_go_TC004_appMovil', function(err, result){
        if (err) {

            console.log(err)
            res.status(200).send({code:3,message:'La conexión ha sido interrumpida'})
        } else {
            // console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          // console.log(result.recordset[0]["code_id"]) // first recordset from result.recordsets 

          try{
            if(result.recordsets[0].length==1){
                
               res.status(200).send({code:_codeExitoso,message:_mensajeValida})
             }else{
            
              res.status(200).send({code:_codeError,message:_mesajeInvalido})
            
              }
          }catch(e){
            res.status(200).send({code:_codeError,message:_mesajeInvalido})
          }
          
        }
    }) 
}
function ExisteEMail(res,pass,email,array){
    let request = new sqlapi.Request()
    console.log(pass)
    console.log(email)
      array.forEach(function(element) {
          request.input(element.nombre, element.tipo, element.valor)    
    }, this)

 request.execute('sp_go_TC004_appMovil',  function(err, result,b){
     
        if (err) {
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
            return
        } else {
           //  console.log(result.recordsets[0].length) // count of rows contained in first recordset 
          //  console.log(result.recordset) // first recordset from result.recordsets 
          if(result.recordsets[0].length==1){
         mail.send_mail(res,email,pass)
        }else{        
            res.status(200).send({code:6,message:'El correo '+email+' '+'es invalido'})
            return 

           }
        }
    })
 
    
   
}

function executeStoredProcedure(res, array, spName, resultName, numberRows,mail) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
        //console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(200).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
          // console.log(result.recordsets.length) // count of recordsets returned by the procedure 
            console.log(result.recordsets[0].length) // count of rows contained in first recordset 
         //  console.log(result.recordset) // first recordset from result.recordsets 
       //    console.log(result.returnValue) // procedure return value 
          //  console.log(result.output) // key/value collection of output values 
         //   console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens 
            if(result.recordsets[0].length==1){
               resultName[1].result_api=result.recordset
         
               //res.status(200).send(resultName)
               res.status(200).send({code:0,message:'Usuario creado exitosamente',token:service.createToken(result.recordset[0]["code_id"])})
           }else{
   
                resultName[1].result_api=result.recordset[numberRows-1]
               // res.status(200).send(resultName)
                res.status(200).send({code:2,message:'El correo '+mail+' '+'ya está siendo usado en el sistema. por favor inserte otro correo'})
            {result: result.recordset[numberRows-1]}
                
            }
        }
    })
}


function executeStoredProcedureProductos(res, array, spName, resultName, numberRows) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
       // console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
       if(result.recordsets[0].length==1){
        res.status(200).send(result.recordset)
           }else{ 
         
                res.status(200).send(result.recordset)
                 
            }
        }
    })
}
function executeStoredProcedureCliente(res, array, spName, resultName, numberRows) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
       // console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {

            try{
       if(result.recordsets[0].length==1){
        res.status(200).send(result.recordset[0])
           }else{ 
         
                res.status(200).send(result.recordset[0])
                 
            }
        }catch(e){
            res.status(200).send({code:16,message:'No se puede obtener datos del cliente. Codigo invalido'})
        }
        }
    })
}

function executeStoredProcedurePedidosPost(res, array, spName, resultName, numberRows) {
    var request = new sqlapi.Request()
    //console.dir(array)
    
    array.forEach(function(element) {
       // console.dir(element.nombre + " : " + element.tipo + " : " + element.valor)
        request.input(element.nombre, element.tipo, element.valor)    
    }, this);

    request.execute(spName, function(err, result){
        if (err) {
            console.log(`Error mientras consultaba el SP de la base de datos : ${err}`)
            res.status(500).send({code:3,message: 'La conexión ha sido interrumpida'})
        } else {
       if(result.recordsets[0].length==1){
       
       mail. send_mailPedido(res,result.recordset[0]["ccemail"],result.recordset[0]["ccdesc"],result.recordset[0]["oanumi"])
     //  res.status(200).send({code:0,code_orders:result.recordset[0]["oanumi"]})
        
           }else{                                                                                                                                       
         
            res.status(200).send({code:4,message:'Error no pudo insertarse el pedido Error de tipo de datos'})
                 
            }
        }
    })
}

module.exports = {
    sqlapi,
    executeStoredProcedure,
    VerificarCuenta,
    ExisteEMail,
    executeStoredProcedureProductos,executeStoredProcedurePedidosPost,
    EjecutaProcedimiento,executeStoredProcedureCliente
}
