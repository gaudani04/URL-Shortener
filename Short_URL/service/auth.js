// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "Sid@1234$";

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
function setUser(user){
   return jwt.sign({
        _id:user._id,
        email:user.email
     },secret);
}

function getUser(token){
    if(!token){
        return null;
    }
    // return sessionIdToUserMap.get(id);
     try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // invalid token
  }
}

module.exports = {setUser,getUser};