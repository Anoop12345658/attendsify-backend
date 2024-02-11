
const express = require('express');
const { create, findAll, findStudent, update, delete_ } = require('../controllers/StudentController');

const router = express.Router();

const { createToken, passwordEncryption, verifyToken } = require('../utils/authFunctions');


router.post('/register', async(req,res) => {

    console.log(req.body);

    const hashedPassword = await passwordEncryption(req.body.password);
   
    req.body.password = hashedPassword;
    req.body['createdAt'] = new Date();
    try{
        const entry = await create(req.body);

        if(entry==1){
            res.status(200).send({
                result : "failure",
                message : "Email exists"
            })
        }else if(entry==2){
            res.status(200).send({
                result : "failure",
                message : "Mobile Number exists"
            })
        }
        else{
            res.status(200).send({
                result : "success",
            })
        }
    }catch(error){
        console.log(error)
    }
});

router.post('/search-student', async(req,res) => {
    console.log(req.body);
    console.log(req.body);
    const entry = await findStudent(req.body);
    console.log(entry);
    if(entry==1){
        res.send({
            result:"failure",
            message : "Email not exists"
        })
    }
    else if(entry==2)
    {
        res.send({
            result:"failure",
            message : "Incorrect Password"
        })
    }
    else
    {
        entry.password = "";
        const token =await createToken(entry);
        console.log(token);
        res.cookie("jwt", token, {
            expires : new Date(Date.now()+6000)
        });
        res.send({
            result:"success",
            data : entry,
            token : token
        });
    }
});

router.get('/students', async(req,res) => {
    let entries = await findAll();
    // console.log("hit1");
    // console.log(entries);
    res.status(200).send({
        result : "success",
        data : entries
    })
})

router.put('/students/:id', async(req,res) => {
    let { id } = req.params;
    let data = req.body;
    try{
        let entry = await update(id, data);
        console.log(entry);
        res.send({result : "success"});
    }catch(error){
        console.log(error);
    }

})

router.delete('/students/:id', async(req,res) => {
    let { id } = req.params;
    try{
        let entry = await delete_(id);
        res.send({result : "success"});
    }catch(error){
        console.log(error);
    }
})
module.exports = router;