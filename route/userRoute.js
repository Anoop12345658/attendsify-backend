
const express = require('express');
const { create,findUser,findUserByEmail, update, find } = require('../controllers/TeacherController');
const router = express.Router();

const { createToken, passwordEncryption } = require('../utils/authFunctions');
router.post('/register', async (req,res)=>{

    // console.log(req.user);

    const hashedPassword = await passwordEncryption(req.body.password);
   
    req.body.password = hashedPassword;
    
    
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
            const token =await createToken(entry);
            console.log(token);
            res.cookie("jwt", token, {
                expires : new Date(Date.now()+600000)
            });
            // console.log(cookie);
            res.status(200).send({
                result : "success",
                token : JSON.stringify(token)
            })
        }
        
    }
    catch(err){
        console.log(err);
    }
    
});

router.get('/user', async(req,res)=>{

    // if(!req.cookies.jwt){
    //     res.send({result : "failure" , message : "Sign In required"});
    // }
    console.log(req.cookies);
    res.send({result : "success", token : req.cookies.jwt});
});


router.post('/signin', async(req, res) => {
    console.log(req.body);
    const entry = await findUser(req.body);
    console.log(entry);
    if(entry==1){
        res.send({
            result:"failure",
            message : "Email not exists"
        })
    }
    else if(entry==2){
        res.send({
            result:"failure",
            message : "Incorrect Password"
        })
    }else{
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
    })
}
});
router.post('/signinWithGmail', async(req,res)=>{
    console.log(req.body);
    const { email } = req.body;
    const entry = await findUserByEmail({email});
    if(entry==1){
        res.send({
            result: "failure",
            message : "Email not exists"
        })
    }else{
        entry.password = "";
        const token =await createToken(entry);
        console.log(token);
        res.send({
            result : "success",
            data : entry,
            token : token
        })
    }
});

router.put('/teacher-update/:id',async(req,res) => {
    let { id } = req.params;
    let data = req.body;
    try{
        let entry = await update(id, data);
        entry = await find(id);
        console.log(entry);
        let token =await createToken(entry);
        console.log(token)
        res.send({
            result : "success",
            token : JSON.stringify(token)
        });
    }catch(error){
        console.log(error);
    }
});

router.delete('/delete-teacher-profile/:id', async(req,res) => {
    let { id } = req.params;
    try{
        let entry = await delete_(id);
        res.send({result : "success"});
    }catch(error){
        console.log(error);
    }
})
module.exports = router;