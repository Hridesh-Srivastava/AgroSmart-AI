import jwt from 'jsonwebtoken';
const secret = 'myAI';

// Generating an access token
const accessToken = jwt.sign({
     userId: '123'
     },

   secret,
    { 
        expiresIn: '1d' 
    });

// Generating a refresh token
const refreshToken = jwt.sign({
     userId: '123' 
    },
    
     secret, 
     { 
        expiresIn: '10d'
     });

console.log('Access Token secret :', accessToken);
console.log('Refresh Token secret :', refreshToken);
