const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const readline = require("readline");
const {
  getDecryptedData,
  dataEncryption,
  generateSecretKey,
} = require("./dataProtection");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const usage = chalk.keyword("violet")(
  "\nUsage: index.js -n <new> -e <entries> \n" +
    boxen(chalk.green("\nGtasi's CLI Password Manager\n"))
);
const options = yargs
  .usage(usage)
  .option("n", {
    alias: "new",
    describe: "Add new entry.",
    type: "string",
    demandOption: false,
  })
  .option("e", {
    alias: "entries",
    describe: "Show all entries.",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

const promptUser = () => {
  rl.question(
    chalk.yellow(
      "Type -n <entries> to get new entry or -e to get all existed entries.\n"
    ),
    (answer) => {
      const commandParts = answer.split(" ");
      const command = commandParts[0];
      const entry = commandParts.slice(1).join(" ");

      if (command === "-n") {
        if (entry.length > 0) {
          const secretKey = generateSecretKey();
          dataEncryption(entry, secretKey);
          console.log(chalk.green("\nNew entry created!\n"));
        } else {
          console.log(chalk.red("\nInvalid entry."));
        }
        promptUser();
      } else if (command === "-e") {
        getDecryptedData();
        promptUser();
      } else {
        console.log(
          chalk.yellow(
            "\nInvalid command.Run node index --help to list all available commands.\n"
          )
        );
      }
    }
  );
};

if (options.entries) {
  getDecryptedData();
  promptUser();
}
if (options.new) {
  const message = options.new;
  const secretKey = generateSecretKey();

  dataEncryption(message, secretKey);
  promptUser();
}
promptUser();
