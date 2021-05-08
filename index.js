const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = config.get('PORT') || 5000;

const app = express();
app.use(bodyParser.json({ extended: true ,limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true ,limit: "50mb" }))
// app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routs/auth.route'));
app.use('/api/files', require('./routs/file.route'));

const start = async()=>{
  try{
    await mongoose.connect(config.get('urlDB'),{
      useNewUrlParser : true ,
      useUnifiedTopology:true,
      useCreateIndex:true
    })
    app.listen(PORT, () => console.log(`Connect on ${PORT} ...`))
  }catch(e){
    console.log(`server error --- ${e.message}`);
    process.exit(1)
  }
}

start();
