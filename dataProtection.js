const crypto = require("crypto");
const con = require("./connectDb");
const Crypto = require("crypto-js");
const chalk = require("chalk");
const boxen = require("boxen");

const generateSecretKey = (length = 32) => {
  const randomBytes = crypto.randomBytes(length);
  const secretKey = randomBytes.toString("hex");
  return secretKey;
};

const dataEncryption = (message, secretKey) => {
  const cipherText = Crypto.AES.encrypt(message, secretKey);
  con.query(
    `INSERT INTO data (encryptedData, secretKey) VALUES (?,?)`,
    [cipherText.toString(), secretKey],
    (err, rows) => {
      if (err) throw err;
      console.log(chalk.green("Data encrypted successfully."));
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

const getDecryptedData = () => {
  con.query("SELECT * from data", (err, rows) => {
    if (err) throw err;
    let decryptedEntries = "";
    rows.forEach((row) => {
      const decryptMessage = dataDecryption(
        row.encryptedData.toString("utf8"),
        row.secretKey
      );
      decryptedEntries += decryptMessage + "\n";
    });
    const boxedEntries = boxen(chalk.green(decryptedEntries), {
      padding: 1,
      borderColor: "yellow",
    });
    console.log(boxedEntries);
  });
};

module.exports = { dataEncryption, getDecryptedData, generateSecretKey };
