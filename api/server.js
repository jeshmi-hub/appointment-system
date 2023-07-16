const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan')
dotenv.config();


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))


app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/doctorCategoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/doctorRouter'))
app.use('/api', require('./routes/paymentRoute'))


mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.DBCONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        console.log("database connected");
      } else {
        console.log("cannot connect to db");
        console.log(err);
      }
    }
  );

 
const port = process.env.PORT || 8000

app.listen(port, () =>{
    console.log('server is running on', port)
})