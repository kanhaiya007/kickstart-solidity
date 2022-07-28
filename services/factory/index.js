import web3 from "../web3";
import compiledFactory from "../../build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    compiledFactory.abi,
    process.env.NEXT_PUBLIC_DEPLOYED_ADDRESS
);

export default instance;
