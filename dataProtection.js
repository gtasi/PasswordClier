const crypto = require("crypto-js");
const con = require("./connectDb");

const dataEncryption = (message, secretKey) => {
  const cipherText = crypto.AES.encrypt(message, secretKey);

  return cipherText;
};

const dataDecryption = (message, secretKey) => {
  const bytes = crypto.AES.decrypt(message, secretKey);
  const originalTest = bytes.toString(crypto.enc.Utf8);
  return originalTest;
};
con.query(
  `INSERT INTO data (idData,dataName,userName,password,email,secretKey) VALUES ("1","1","1","1","1","1")`,
  (err, rows) => {
    if (err) throw err;
    console.log("Data:", rows);
  }
);
module.exports = { dataEncryption, dataDecryption };
