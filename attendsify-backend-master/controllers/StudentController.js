
const { findOne } = require('../entities/Teacher');
const StudentModel = require('../entities/Student');

const create = async (student) => {
    const { email, mobileNumber } = student;

    let instance = await StudentModel.find({email});
    console.log(instance);
    if(instance.length > 0){
        return 1;
    }

    instance = await StudentModel.find({mobileNumber});
    console.log(instance);
    if(instance.length>0){
        return 2;
    }
    const student1 = new StudentModel(student);
    const entry = await student1.save();
    return entry;
}


const findAll = async () =>{
    let instances = await StudentModel.find();
    return instances;
}

const findStudent = async(entry) => {
    const { email, password } = entry;
    let instance = await StudentModel.findOne({email});
    
    if(!instance){
        return 1;
    }
    else if(!instance.comparePassword(password)){
        return 2;
    }
    else{
        return instance;
    }
}

const update = async(_id, data) => {
    const instance = await StudentModel.updateOne({_id}, data);
    return instance;
}

const delete_ = async (_id) => {
    const instance = await StudentModel.deleteOne({_id});
}
exports.create = create;

exports.findAll = findAll;

exports.update = update;

exports.delete_ = delete_;

exports.findStudent = findStudent;