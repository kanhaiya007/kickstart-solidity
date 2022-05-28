// dependency to be included in package.json
// "solc": "^0.8.14-fixed",
// "fs-extra": "^10.1.0",

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Build Path
const buildPath = path.resolve(__dirname, "build");
// Contracts path
// Change "contracts" to your contract path
const contractsPath = path.resolve(__dirname, "contracts");
// Remove previous build if any
fs.removeSync(buildPath);

// Get all the list of contracts available inside contracts/specified folder
const allContracts = fs.readdirSync(contractsPath);

let sources = {};
// Generate list of sources to be passed as input for solc
for (let contract of allContracts) {
    const contractPath = path.resolve(__dirname, "contracts", contract);
    let sourceData = fs.readFileSync(contractPath, "utf-8");
    /*
  The source structure looks something like
  {
  Contract.sol : {
      content : sourceData [Content of contract]
    }
  }
  */
    sources = {
        ...sources,
        [contract]: { content: sourceData },
    };
}

var input = {
    language: "Solidity",
    sources: sources, // passing sources here
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

// compile input with solc
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Loop over compiled contracts and save the compiled output in the specified contract file inside build directory.
for (let contract of allContracts) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace("sol", "json")), // Change the file name from Contract.sol to Contract.json to save output in JSON File
        output.contracts[contract][contract.replace(".sol", "")] // Output returned contract contract name as key
    );
}
