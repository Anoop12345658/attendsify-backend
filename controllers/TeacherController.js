
const { findOne } = require('../entities/Teacher');
const TeacherModel = require('../entities/Teacher');


const create = async(teacher) => {
    const { email, mobileNumber } = teacher;

    let instance = await TeacherModel.find({email});
    console.log(instance);
    if(instance.length > 0){
        return 1;
    }

    instance = await TeacherModel.find({mobileNumber});
    console.log(instance);
    if(instance.length>0){
        return 2;
    }

    
    const teacher1 = new TeacherModel(teacher);
    const entry = await teacher1.save();
    return entry;
}
const findUser = async(entry) =>{
    const { email, password } = entry;
    let instance = await TeacherModel.findOne({email});
    
    if(!instance){
        return 1;
    }
    else{
        const match = await instance.comparePassword(password);
        if(match==false){
            return 2;
        }else{
            return instance;
        }
    }
}

const find = async(_id) => {
    let instance = await TeacherModel.findOne({_id});
    return  instance;
}

const findUserByEmail = async(email) => {
    let instance = await TeacherModel.findOne(email);
    if(!instance){
        return 1;
    }
    else{
        return instance;
    }
}
const update = async(_id, data) => {
    const instance = await TeacherModel.updateOne({_id}, data);
    return instance;
}

const delete_ = async (_id) => {
    const instance = await TeacherModel.deleteOne({_id});
}
module.exports.create = create;
module.exports.findUser = findUser;
module.exports.find = find;
module.exports.findUserByEmail = findUserByEmail;
module.exports.update = update;
module.exports.delete_ = delete_;