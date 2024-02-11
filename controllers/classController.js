const { findOne } = require('../entities/Teacher');
const ClassModel = require('../entities/Classes');

const create = async (classs) => {
    const {subject} = classs;
    let instance = await ClassModel.find({subject});
    if(instance.length>0){
        return 1;
    }else{
        const class1 = new ClassModel(classs);
        const entry =await class1.save();
        return entry;
    }
};

const findAll = async(query = {}) => {
    const instances = await ClassModel.find(query);
    return instances;
}

const update = async(_id, data) => {
    const instance = await ClassModel.updateOne({_id}, data);
    return instance;
}

const delete_ = async (_id) => {
    const instance = await ClassModel.deleteOne({_id});
}
exports.create = create;
exports.findAll = findAll;
exports.update = update;
exports.delete_ = delete_;


