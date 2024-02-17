var cron = require ('node-cron')
var express = require ('express')
var nodemailer = require('nodemailer')
app = express();

const send_remainder = async (req,res) => {
    try {

    } catch (error) {
        console.log("Error in sendRemainder",error)
    }
}

const  sendmail= async (req,res) => {
    console.log("In........")
    try {
        console.log("In........")
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                user: 'veerababup9999@gmail.com',
                pass : ''},
            port : 465,
            host : 'smtp@gmail.com',
            secure : true 
        })
        options = {
            from : 'veerababup9999@gmail.com',
            to : 'skemburu@miraclesoft.com',
            subject : 'success celebrations',
            text : 'Happy diwali!! May this diyas rise a light on you'
        }
        transporter.sendMail(options, (err) => {
            if (err)
            {
                console.log(err)
            }
            else{
                console.log('email sent')
            }
        })
        res.send("ok")
    } catch (error) {
        console.log("error in sendMail",error)
        res.send("Not ok")
        return {status:false, data:"error in sendMail"}
       
    }
  
    }
module.exports = {
    send_remainder,
    sendmail
}