const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/short-url";
 
//mongodb connect
async function connectMongoDB() {
    return mongoose.connect(URL).then(()=>{
    console.log("mongoDB is connected");
   
}).catch((err)=>{
    console.log(err);
    
})
};
module.exports = {connectMongoDB};