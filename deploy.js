require("dotenv").config();
console.log(process.env);

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const util = require("util");

console.log(process.env.SECRET_RECOVERY_KEY);

const provider = new HDWalletProvider(
    process.env.SECRET_RECOVERY_KEY,
    "https://rinkeby.infura.io/v3/fd7069fc816f4f47a69fd9ef883946eb"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying with", accounts[0]);
    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({
            data: compiledFactory.evm.bytecode.object,
            // arguments: ["Hi Deploying first contract on rinkeby"],
        })
        .send({ from: accounts[0], gas: 5000000 });
    console.log(
        util.inspect(compiledFactory.abi, {
            showHidden: false,
            depth: null,
            colors: true,
        })
    );
    console.log("Contract deployed to", result.options.address);
};

deploy();
