const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const TeacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  gender : {
    type: String,
    required: true,
  },
  mobileNumber : {
    type: String,
    required: true,
  },
  role : {
    type : String,
    required : true,
  },
  department : {
    type: String,
    required: true,
  },
  payment : {
    type : Object,
    required: false,
  },
  password : {
    type: String,
    required: true,
  }
});

TeacherSchema.methods.comparePassword =async function(password) { 
  console.log("hit-password");
  const match = await bcryptjs.compare(password,this.password);
  console.log(match);
  return match;
}
const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;