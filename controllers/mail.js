'use strict'

const boby_parser = require('body-parser')
const my_mail = require('nodemailer')
var nodemailer = require('nodemailer')

function send_mail( res, destination_mail, message_passw){
  
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'marcoantoniomamanichura@gmail.com',
            pass: 'markanthony2016'
        }
    });
    // setup e-mail data with unicode symbols
var mailOptions = {
    from: '<marcoantoniomamanichura@gmail.com>', // sender address
    to: destination_mail, // list of receivers
    subject: 'BIOPETROL SRL', // Subject line
    text: '', // plaintext body
    html: '<div style="width:94%;float:left;display:block;text-align:center;margin:3%;border:1px solid #efefef;border-radius:10px"><div style="width:100%;float:left;display:block;text-align:center"><img src="http://34.209.250.214/RestoBar/Bebida/agua.png" height="180px" style="margin:2.5%" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 311.438px; top: 170.2px;"><div id=":le" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Descargar el archivo adjunto " data-tooltip-class="a1V" data-tooltip="Descargar"><div class="aSK J-J5-Ji aYr"></div></div></div><div style="font-size:22px;background-color:#313b42;width:96%;float:left;display:block;text-align:center;color:#fff;padding:2%">RESTAURACION DE CONTRASEÑA</div></div><div style="width:90%;float:left;display:block;text-align:center;padding:5%;font-size:18px">Señor usuario se le ha generado una nueva contraseña <br><span style="color:#ff;font-weight:bold;font-size:24px">'+message_passw+'</span></div><div style="width:95%;float:left;display:block;text-align:right;padding:2.5%">EMPRESA DE DESARROLLO DE SOFWTARE  DINASES SRL - 2017</div></div>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    res.status(200).send({code:0,message:'Nueva contraseña generada. revise su correo por favor'})
    console.log('Message sent: ' + info.response);
    return

});
}


function send_mailPedido( res, destination_mail, name,cod_pedido){
    
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'marcoantoniomamanichura@gmail.com',
              pass: 'markanthony2016'
          }
      });
      // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '<marcoantoniomamanichura@gmail.com>', // sender address
      to: destination_mail, // list of receivers
      subject: 'BIOPETROL SRL', // Subject line
      text: '', // plaintext body
      html: '<div style="width: 94%; float: left; display: block; text-align: center; margin: 3%; border: 1px solid #efefef; border-radius: 10px;"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 311.438px; top: 170.2px;">&nbsp;</div><div class="a6S" dir="ltr" style="opacity: 0.01; left: 311.438px; top: 170.2px;">&nbsp;</div><div class="a6S" dir="ltr" style="opacity: 0.01; left: 311.438px; top: 170.2px;">&nbsp;</div><div style="width: 100%; float: left; display: block; text-align: center;"><div style="font-size: 22px; background-color: #0288d1; width: 96%; float: left; display: block; text-align: center; color: #fff; padding: 2%;">'+name+' <br />GRACIAS POR TU PEDIDO</div><img class="CToWUd a6T" style="margin: 2.5%;" tabindex="0" src="http://34.209.250.214/RestoBar/Bebida/agua.png" height="200px" /></div><div style="width: 90%; float: left; display: block; text-align: center; padding: 5%; font-size: 18px;">Su pedido ha sido realizado con exito. Su numero de pedido generado es: <br /><span style="color: #ff; font-weight: bold; font-size: 24px;">#'+cod_pedido+'</span></div><div style="width: 95%; float: left; display: block; text-align: right; padding: 2.5%;">EMPRESA DE DESARROLLO DE SOFWTARE DINASES SRL - 2017</div></div>' // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      res.status(200).send({code:0,code_orders:cod_pedido})
      console.log('Message sent: ' + info.response);
      return
  
  });
  }

module.exports = {
    send_mail,
    send_mailPedido
}
