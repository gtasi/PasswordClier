const crypto = require("crypto-js");

const dataEncryption = (message, secretKey) => {
  const cipherText = crypto.AES.encrypt(message, secretKey);
  return cipherText;
};

const dataDecryption = (message, secretKey) => {
  const bytes = crypto.AES.decrypt(message, secretKey);
  const originalTest = bytes.toString(crypto.enc.Utf8);
  return originalTest;
};

module.exports = { dataEncryption, dataDecryption };
