const mongoose = require("mongoose");


const ClassSchema = new mongoose.Schema({
    subject : {
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
    addedBy : {
      type: String,
      required: true,
    },
    createdAt: {
      type : Date,
      required : true,
    },
  });


const Classes = mongoose.model("Classes", ClassSchema);

module.exports = Classes;