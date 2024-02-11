
// const { response } = require('express');
const express = require('express');
const { create, findAll } = require('../controllers/AttendenceController');
const { find } = require('../entities/Classes');
const { getTodaysDate, getTime, changeDateFormat } = require('../utils/dateFunctions');
const router = express.Router();


router.post('/mark-attendence',async(req,res) => {
    
    req.body['date']   = getTodaysDate();
    req.body['time'] = getTime();
    req.body['createdAt'] = new Date;
    console.log("DISAJIWEJAIJWJE");
    console.log(req.body);
    try{
        const entry = await create(req.body);
        console.log( entry );
        let response = {};
        if(entry==1){
            response['result'] = 'failure';
            response['message'] = 'StudentId Exists';  
        }else{
            response['result'] = 'success';
            response['data'] = entry;
        }
        res.status(200).send(response);
    }catch(error){
        console.log(error)
    }
});

router.get('/today-attendence', async (req,res) => {
    const {subjectId} = req.params;
    
    try{
        const entries = await findAll({});
        res.status(200).send({
            result : "success",
            data : entries,
        })
    }
    catch(error){
        console.log(error);
    }
});

router.post('/current-marked-attendence', async(req,res) => {
    // console.log(req.body);
    const date = getTodaysDate();
    console.log(new Date((new Date().getTime()-1000 * 60 * 18)));
    let query = {
        ...req.body, 
        date,
        createdAt: { 
            // 18 minutes ago (from now)
            $gt: new Date((new Date().getTime()-1000 * 60 * 90))
        }
    }
    // req.body = {...req.body, date};
    try{

       
        const entires = await findAll(query);

        res.status(200).send({
            result : "success",
            data : entires,
        })
    }catch(error){
        console.log(error);
    }
});

router.post('/attendence-records', async(req,res)=>{
    console.log(req.body);
    let {start,end,subjectId} = req.body;    

    try{
        const entries = await findAll({subjectId});
        let instances = [];
        for(let entry of entries){
            let {date} = entry;
            let changedFormat = changeDateFormat(date);
            let d1 = new Date(start);
            let d2 = new Date(end);
            let d3 = new Date(changedFormat);

            if(d1<=d3 && d3<=d2){
                instances.push(entry);
            }

        }
        res.status(200).send({
            result : "success",
            data : instances,
        })
    }catch(error){
        console.log(error);
    }
});


module.exports = router;