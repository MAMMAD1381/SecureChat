import forge from 'node-forge';

class Crypto {
  constructor(privateKeyPem, publicKeyPem) {
    this.privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  }

  // Method to sign data
  signData(data) {
    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const signature = this.privateKey.sign(md);
    return forge.util.encode64(signature);
  }

  // Method to verify signature
  verifySignature(data, signature) {
    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const decodedSignature = forge.util.decode64(signature);
    return this.publicKey.verify(md.digest().bytes(), decodedSignature);
  }

  // Method to encrypt data with public key
  encryptData(data) {
    const encrypted = this.publicKey.encrypt(data, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  }

  // Method to decrypt data with private key
  decryptData(encryptedData) {
    const encrypted = forge.util.decode64(encryptedData);
    const decrypted = this.privateKey.decrypt(encrypted, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    return decrypted;
  }
}

export default Crypto;
