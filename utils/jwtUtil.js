const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const pathToPrivateKey = process.env.JWT_PRIVATE_KEY_PATH;
const PRIV_KEY = fs.readFileSync(pathToPrivateKey, 'utf8');

function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt, hash
    };
}

function issueJWT(user) {
  
    const { _id, email, role } = user;
    const expiresIn = '1d';
    
    const payload = {
      sub: _id,
      iat: Date.now(),
      email,
      role
    };
    
    const signedToken = jsonwebtoken.sign(payload, { key: PRIV_KEY, passphrase: process.env.JWT_PRIVATE_KEY_PASSWORD }, { expiresIn: expiresIn, algorithm: 'RS256' });
    
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;