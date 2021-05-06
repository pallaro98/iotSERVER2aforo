const jwt = require('jwt-simple');

let config = require('../config');


function stringToHash(string) {
                  
    var hash = 0;
      
    if (string.length == 0) return hash;
      
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
      
    return hash;
}

function createJWT(userId){
    const payload = {
        sub: userId,
        iat: Date.now()
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = {
    stringToHash,
    createJWT
  };