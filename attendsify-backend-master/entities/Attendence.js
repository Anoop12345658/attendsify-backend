const mongoose = require("mongoose");


const AttendenceRecordSchema = new mongoose.Schema({
    studentId : {
        type: String,
        required: true,
    },
    teacherId : {
      type: String,
      required: true,
    },
    subjectId : {
      type: String,
      required: true,
    },
    subject : {
        type: String,
        required: true,
    },
    semester : {
        type: String,
        required: true,
    },
    date: {
      type : String,
      required : true,
    },
    time: {
        type : String,
        required : true,
      },
    status: {
      type : String,
      required : false,
    },
    createdAt: {
      type : Date,
      required : true,
    },
  });


const AttendenceRecord = mongoose.model("AttendenceRecord", AttendenceRecordSchema);

module.exports = AttendenceRecord;