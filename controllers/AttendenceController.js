
const AttendenceModel = require('../entities/Attendence');
const { getTodaysDate } = require('../utils/dateFunctions');

const create = async (instance) => {
    let {date,studentId,subjectId} = instance;

    let instance1 = await AttendenceModel.find({studentId,date,subjectId});
    if(instance1.length>0){
        return 1;
    }
    else{
        const attendence = new AttendenceModel(instance);
        console.log(attendence);
        const entry =await attendence.save();
        return entry;
    }
    
};

const findAll = async (query = {}) =>{
    const instances = await AttendenceModel.find(query);
    return instances;
}



exports.create = create;
exports.findAll = findAll;
