const mongoose=require('mongoose');
require('dotenv').config(); // Load .env file

const databaseConnection=async()=>{
  await mongoose.connect('mongodb://localhost:27017/book')
  .then(()=>{
     console.log("hey database connected");
     
  })
  .catch((error)=>{
    console.log(error);
    
  })
}

module.exports=databaseConnection;