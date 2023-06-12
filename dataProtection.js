const crypto = require("crypto");
const con = require("./connectDb");
const Crypto = require("crypto-js");

const generateSecretKey = (length = 32) => {
  const randomBytes = crypto.randomBytes(length);
  const secretKey = randomBytes.toString("hex");
  return secretKey;
};

const dataEncryption = (message, secretKey) => {
  const cipherText = Crypto.AES.encrypt(message, secretKey);
  con.query(
    `INSERT INTO data (idData, encryptedData, secretKey) VALUES (3,?,?)`,
    [cipherText.toString(), secretKey],
    (err, rows) => {
      if (err) throw err;
      console.log("Data:", rows);
    }
  );
  return cipherText;
};

const dataDecryption = (message, secretKey) => {
  const bytes = Crypto.AES.decrypt(message, secretKey);
  const originalTest = bytes.toString(Crypto.enc.Utf8);
  return originalTest;
};

const secretKey = generateSecretKey();

dataEncryption("gtasi gtasi", secretKey);

con.query("SELECT * from data", (err, rows) => {
  if (err) throw err;
  console.log(rows);
  rows.forEach((row) => {
    const decryptMessage = dataDecryption(
      row.encryptedData.toString("utf8"),
      row.secretKey
    );
    console.log("Decrypted message:", decryptMessage);
  });
});
module.exports = { dataEncryption, dataDecryption };
