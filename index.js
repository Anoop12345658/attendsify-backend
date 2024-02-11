const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors());

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3200;
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser());
mongoose.connect(
    "mongodb+srv://sanya30122000:sanya30122000@cluster0.vmkwj.mongodb.net/attendence?retryWrites=true&w=majority", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
});

// app.use(function(req, res, next) {
//   console.log(req.headers);
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
//       if (err) req.user = undefined;
//       req.user = decode;
//       next();
//     });
//   } else {
//     req.user = undefined;
//     next();
//   }
// });
const teacherRoute = require('./route/userRoute');
const studentRoute = require('./route/studentRoute');
const classRoute = require('./route/classRoute');
const attendenceRoute = require('./route/attendenceRoute');
const paymentRoute = require('./route/paymentRoute');
const homePageRoute = require('./route/homePageRoute');


app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);
app.use(classRoute);
app.use(attendenceRoute);
app.use(paymentRoute);
app.use(homePageRoute);
app.listen(PORT, ()=>{
console.log("app is listeing on 3200");
})
