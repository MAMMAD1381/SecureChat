const crypto = require('crypto');

const generateKeys = () => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        }, (err, publicKey, privateKey) => {
            if (err) reject(err);
            resolve({ publicKey, privateKey });
        });
    });
};

module.exports = generateKeys;
