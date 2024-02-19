var cron = require("node-cron");
var express = require("express");
var nodemailer = require("nodemailer");
const sql = require("mssql");
const resend1 = require("resend");
require("dotenv").config();
const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionTimeout: JSON.parse(process.env.DB_CONNECTION_TIMEOUT_VALUE),
  options: {
    encrypt: true,
  },
};

const send_remainder = async (req, res) => {
  try {
    console.log("innn........");
    const empId = req.params.empId;
    const query = `select Email from [dbo].[Employees] where Id in ('${empId}')`;
    const pool = await sql.connect(config);
    const response = await pool.request().query(query);
    const to = response.recordset[0].Email;
    console.log(to);
    const resend = new resend1("re_YQ2UvsKr_32kiL7d9Eo4fNUnCtWJc4Jnh");

    const res = resend.emails.send({
      from: "remainder@stackdeveloper.in",
      to: to,
      subject: "Invitation to Join ToDo App",
      text: `Hello Developer, This Task assigned to you.`,
    });
    console.log(res);
    res.status(200).json({ status: true, data: "Email Sent" });
  } catch (error) {
    console.log("Error in sendRemainder", error);
    res.status(200).json({ status: false, data: "Email Sent Failed" });
  }
};

const sendmail = async (req, res) => {
  console.log("In........");
  try {
    let empId = req.body.empId;
    empId = empId.map((ele) => {
      return `'${ele}'`;
    });
    // console.log("entityId", entityId.join(","));
    let id = empId.join(",");
    console.log("Id...............", id);
    const query = `select Email from [dbo].[Employees] where Id in (${id})`;
    const pool = await sql.connect(config);
    const response = await pool.request().query(query);
    for (let i = 0; i < response.recordset.length; i++) {
      let to = response.recordset[i].Email;

      console.log("In........");
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "veerababup9999@gmail.com",
          pass: "ntfiirfbdsh",
        },
        port: 465,
        host: "smtp@gmail.com",
        secure: true,
      });
      options = {
        from: "veerababup9999@gmail.com",
        to: to,
        subject: "success celebrations",
        text: "Happy diwali!! May this diyas rise a light on you",
      };
      transporter.sendMail(options, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent");
        }
      });
    }

    // res.send("ok");
    return res.status(200).json({status:true,data:"Email sent Successfully"})
  } catch (error) {
    console.log("error in sendMail", error);
    res.send("Not ok");
    return res.status(500).json({status:false,data:"Email not sent "})
  }
};
module.exports = {
  send_remainder,
  sendmail,
};
