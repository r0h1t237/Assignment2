// importing packages
require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const helmet=require('helmet');
const hpp = require('hpp');

// importing middleware
const {logger}=require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const receipeRoute = require('./routers/recipe');

// assigning port 
const port =process.env.PORT || 8080;

const app = express();

// for protection
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// logging error in reqLog
app.use(logger);

// transfer route towards recipe
app.use('/recipe', receipeRoute);

// logging error in errorLog
app.use(errorHandler)
 
// connected to mongodb
mongoose.connect(process.env.LOCAL_DATABASE_URI).then(
  ()=>{
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log(`Server running on port :${process.env.PORT}`);
    });

  },
  err=>{
    console.error(err)
  }
);
