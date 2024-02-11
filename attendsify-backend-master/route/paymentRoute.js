const { response } = require('express');
const express = require('express');
const config = require('../config.json');
const router = express.Router();
const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: config.razorpay.key_id,
  key_secret: config.razorpay.key_secret,
});


router.post('/create-order', async(req,res) => {
    let razorpayResponse = await instance.orders.create({
        amount: req.body.amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2"
        }
    });

    console.log(razorpayResponse);

    res.send({
        "result" : "success",
        data : razorpayResponse
    })
});

module.exports = router;