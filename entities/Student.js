const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const StudentSchema = new mongoose.Schema({
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
  branch : {
    type: String,
    required: true,
  },
  semester : {
    type: String,
    required: true,
  },
  dob : {
    type: String,
    required: true,
  },
  rollno : {
    type: String,
    required: true,
  },
  gender : {
    type: String,
    required: true,
  },
  specialization : {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
  },
  mobileNumber : {
    type: String,
    required: true,
  },
  teacherAccessEmail : {
    type: Array,
    required: true,
  },
  role : {
    type: String,
    required: true,
  },
  createdAt: {
    type : Date,
    required : true,
  },
});

this.createdAt = new Date();


StudentSchema.methods.comparePassword =async function(password) { 
  console.log("hit");
  const match = await bcryptjs.compare(password,this.password);
  return match;
}

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;