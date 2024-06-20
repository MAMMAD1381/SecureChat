import CryptoJS from 'crypto-js'
import forge from 'node-forge';


import { getProfile } from '../controllers/user'

const user = await getProfile()
const privateKey = user.privateKey
const publicKey = user.publicKey

// Generate keys (normally done securely on the backend)
const PrivateKey = forge.pki.privateKeyFromPem(privateKey); // Replace with your private key
const PublicKey = forge.pki.publicKeyFromPem(publicKey); // Replace with your public key

// Function to sign data
const signData = (data) => {
  const signature = CryptoJS.HmacSHA256(data, privateKey).toString(CryptoJS.enc.Base64)
  return signature
}

const verifySignature = (data, signature, publicKey) => {
  const expectedSignature = CryptoJS.HmacSHA256(data, privateKey).toString(CryptoJS.enc.Base64)
  return signature === expectedSignature
}

const encryptData = (data) => {
  const encrypted = PublicKey.encrypt(data, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);
};

const decryptData = (encryptedData) => {
  const encrypted = forge.util.decode64(encryptedData);
  const decrypted = PrivateKey.decrypt(encrypted, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return decrypted;
};
// Example usage:
const dataToSign = 'Hello, world!'
const signature = signData(dataToSign)
console.log('Signature:', signature)

// Example usage:
const dataToVerify = 'Hello, world!' // Should match with dataToSign
const isSignatureValid = verifySignature(dataToVerify, signature, publicKey)

if (isSignatureValid) {
  console.log('Signature is valid!')
} else {
  console.log('Signature is not valid!')
}

// Example usage:
const dataToEncrypt = 'Sensitive information';
const encryptedData = encryptData(dataToEncrypt);
console.log('Encrypted Data:', encryptedData);

// Example usage:
const decryptedData = decryptData(encryptedData);
console.log('Decrypted Data:', decryptedData);


export {}
