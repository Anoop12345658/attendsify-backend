const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email' , async(req,res) =>{
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sanya30122000@gmail.com',
          pass: 'sjbjzzdstiyxamrt'
        }
    });
      
      var mailOptions = {
        from: 'sanya30122000@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send({
            result : "success",
          })
        }
      });
})

module.exports = router;