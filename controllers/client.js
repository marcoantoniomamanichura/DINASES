'use strict'
const jwt=require('jwt-simple')
const config=require('../config')
const accessDataModel = require('../models/access_data')
const my_basic_auth = require('basic-auth')
const my_mail = require('./mail')
const service=require('../Services')
var nodemailer = require('nodemailer')
var validator = require('email-validator')
var generator = require('generate-password')
function isValidEmail(mail) { 
  return  validator.validate(mail)
  }


  function getClients(req, res){
    //console.log('GET /api/categoria-producto')
    //console.log(req.body)
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub

   
    //console.log(detalle)
    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 3},
    {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": cod_cliente}]
                    
   accessDataModel.executeStoredProcedureCliente(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'GET /api/orders'}, {result_api: null}], 1)

}
  function putPassword(req, res){
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
    req.check('old_password_cli', '{"code":"7","message":"La contraseña no puede ser vacio. Por favor inserte una valida"}').notEmpty();
var erros = req.validationErrors();
var result=""
if(erros){
  for (var i = 0; i < erros.length; i++) {    
      result=result+erros[i].msg+","
     result= result.substring(0, result.length - 1); 
      res.status(200).send(JSON.parse(result));
      return
  }; }

  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 15}, /*1 Opción de registro de cliente*/
  {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor":cod_cliente},
  {"nombre":"old_password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.old_password_cli},
  {"nombre":"new_password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.new_password_cli}]
                  
 accessDataModel.EjecutaProcedimiento(res, array,0,15,"La contraseña ha sido modicado correctamente","La contraseña es incorrecta. Por favor inserte su contraseña actual más su contraseña nueva")


 

}

function putClient(req, res){
    const token =req.headers.tokenauthorization
    const payload=jwt.decode(token,config.SECRET_TOKEN)
    const cod_cliente=payload.sub
req.check('full_name', '{"code":"8","message":"El nombre no puede ser vacío. Por favor inserte un nombre valido"}').notEmpty();
req.check('phone', '{"code":"9","message":"El telefono no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('address', '{"code":"10","message":"La dirección no puede ser vacío. Por favor coloque su dirección actual"}').notEmpty();
req.check('location_lat', '{"code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();
req.check('location_log', '{"code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();

req.check('location_lat', '{"code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('location_log', '{"code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
var erros = req.validationErrors();
var result=""
if(erros){
  for (var i = 0; i < erros.length; i++) {    
      result=result+erros[i].msg+","
     result= result.substring(0, result.length - 1); 
      res.status(200).send(JSON.parse(result));
      return
  }; }

  let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 14}, /*1 Opción de registro de cliente*/
  {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor":cod_cliente},
  {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.full_name},
  {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.business_name},
  {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
  {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.phone},
  {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.cell_phone},
  {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.address},
  {"nombre":"reference", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.reference},
  {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_lat},
  {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_log}]
                  
 accessDataModel.EjecutaProcedimiento(res, array,0,14,"Los datos han sido modicado correctamente","Los datos del cliente no pudieron ser modificados")


 

}





function postClient(req, res){
      //console.log(JSON.stringify(req.body.mail))
req.check('full_name', '{"code":"8","message":"El nombre no puede ser vacío. Por favor inserte un nombre valido"}').notEmpty();
req.check('password_cli', '{"code":"7","message":"La contraseña no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('phone', '{"code":"9","message":"El telefono no puede ser vacio. Por favor inserte una valida"}').notEmpty();
req.check('address', '{"code":"10","message":"La dirección no puede ser vacío. Por favor coloque su dirección actual"}').notEmpty();
req.check('location_lat', '{"code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();
req.check('location_log', '{"code":"11","message":"Los datos de la ubicación es invalida por favor seleccione una correcta"}').notEmpty();

req.check('location_lat', '{"code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('location_log', '{"code":"12","message":"El tipo de dato de la ubicación es invalido"}').isDecimal();
req.check('mail', '{"code":"5","message":"La Dirección De Correo Es Invalido. Inserte Un Correo Valido"}').isEmail();
var erros = req.validationErrors();
var result=""
if(erros){

    for (var i = 0; i < erros.length; i++) {
      
        result=result+erros[i].msg+","
       result= result.substring(0, result.length - 1); 
        res.status(200).send(JSON.parse(result));
        return
    }; 
  //  result= "["+result.substring(0, result.length - 1)+"]"; 
   // res.status(200).send(JSON.parse(result));
    // return

}


    let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 1}, /*1 Opción de registro de cliente*/
                 {"nombre":"code_id", "tipo": accessDataModel.sqlapi.Int, "valor": 0},
                 {"nombre":"full_name", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.full_name},
                 {"nombre":"business_name", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.business_name},
                 {"nombre":"nit", "tipo": accessDataModel.sqlapi.NVarChar(20), "valor": req.body.nit},
                 {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.mail},
                 {"nombre":"phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.phone},
                 {"nombre":"cell_phone", "tipo": accessDataModel.sqlapi.NVarChar(50), "valor": req.body.cell_phone},
                 {"nombre":"address", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.address},
                 {"nombre":"reference", "tipo": accessDataModel.sqlapi.NVarChar(200), "valor": req.body.reference},
                 {"nombre":"location_lat", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_lat},
                 {"nombre":"location_log", "tipo": accessDataModel.sqlapi.Decimal(18,14), "valor": req.body.location_log},
                 {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
                    
   accessDataModel.executeStoredProcedure(res, array,
     'sp_go_TC004_appMovil', [{operation_api: 'POST /api/register-client'}, {result_api: null}], 1,req.body.mail)

}


function deleteClient(req, res){
    var query = 'DELETE FROM [user] WHERE Id=' + req.params.id
    executeQuery(res, query)
}

function putRecoverPassword(req, res){
   // console.log(req.body.mail)
    if(isValidEmail(req.body.mail)==false){
        res.status(200).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
        return
    }
    const passw =generator.generate({
        length: 8,
        numbers: true
    });
      let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 6},
    {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
    {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":passw}]
  let b =accessDataModel.ExisteEMail(res,passw,req.body.mail,array)

   
   }

function postClientAuth(req, res) {
   // let user = my_basic_auth(req);  
   
    if ( !req.body.mail || !req.body.password_cli) {
           res.status(200).send({code:4,message:'Datos invalidos. Por favor inserte un correo y una contraseña válida'})
        return
    }
    if(isValidEmail(req.body.mail)==false ){
        res.status(200).send({code:5,message:'La dirección de correo es invalido. inserte un correo valido'})
		return
    }
      res.set('WWW-Authenticate', 'Basic realm=Authorization No Required')
   let array = [{"nombre":"tipo", "tipo": accessDataModel.sqlapi.Int, "valor": 5}, 
   {"nombre":"mail", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor":req.body.mail},
   {"nombre":"password_cli", "tipo": accessDataModel.sqlapi.NVarChar(255), "valor": req.body.password_cli}]
  accessDataModel.VerificarCuenta(res,req.body.mail,req.body.password_cli,array)
}




module.exports = {
       postClient,putClient,
    deleteClient,
    putRecoverPassword,
    postClientAuth,putPassword,getClients
}
