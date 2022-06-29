require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const util = require("util");

const provider = new HDWalletProvider(
    process.env.SECRET_RECOVERY_KEY,
    process.env.NEXT_PUBLIC_RPC_URL
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
