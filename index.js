const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");

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
    type: "string",
    demandOption: false,
  })
  .help(true).argv;
