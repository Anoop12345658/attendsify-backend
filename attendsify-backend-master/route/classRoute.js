const { response } = require('express');
const express = require('express');
const { create, findAll, update, delete_ } = require('../controllers/classController');
const router = express.Router();

router.post('/class',async(req,res)=>{
    console.log(req.body);
    try{
        req.body['createdAt'] = new Date();
        const entry = await create(req.body);
        let response = {};
        if(entry==1){
          response['result'] = 'failure';
          response['message'] = 'Class Name Exists';  
        }else{
            response['result'] = 'success';
            response['data'] = entry;
        }
        res.status(200).send(response);
    }catch(error){
        console.log(error)
    }
});

router.get('/classes', async(req,res)=>{
    try{
        let entries = await findAll();
        res.send({
            result:"success",
            data : entries,
        })
    }catch(error){
        console.log(error)
    }
});


router.put('/classes/:id', async(req,res) => {
    let { id } = req.params;
    let data = req.body;
    try{
        let entry = await update(id, data);
        // console.log(entry);
        res.send({result : "success"});
    }catch(error){
        console.log(error);
    }
});

router.delete('/classes/:id', async(req,res) => {
    let { id } = req.params;
    try{
        let entry = await delete_(id);
        res.send({result : "success"});
    }catch(error){
        console.log(error);
    }
})
module.exports = router;