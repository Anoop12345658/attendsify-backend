const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('../config.json');
const express = require('express');

const createToken = async (user) => {
    console.log(user);
    
    let token = jwt.sign({
        ...user
    },
    config.jwt.secret,
    { expiresIn : 86400 }); //24 hrs
    
    
    return token;
}

const passwordEncryption = async(password) => {
    console.log(password);
    const hashedPassword = bcryptjs.hashSync(password,8);
    return hashedPassword;
}

const verifyToken = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(401).send("User unauthorized");
    }
    // Bearer Token...
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];

    console.log(token);
    if(!token||token==="null"){
        return res.status(401).send("User unauthorized");
    }
    try{
        console.log("hit2");
        let payload = jwt.verify(token, config.jwt.secret);
        console.log("hit3");
        if(!payload){
            return res.status(401).send("User unauthorized");
        }
        console.log("--------->"+payload);
        req.userId = payload.subject;
        next();
    }
    catch(error){

        return res.status(201).send(error);
    }
    
}
exports.createToken = createToken;
exports.passwordEncryption = passwordEncryption;
exports.verifyToken = verifyToken;