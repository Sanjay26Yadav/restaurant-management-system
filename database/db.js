const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/resturant';
module.exports = function(){ mongoose
  .connect(db)
  .then(() => console.log('Database connection successful')).catch((e)=>{
    console.log(`Unable to connect database!!${e}`);
});}











