const assert = require("assert");
const ganache = require("ganache");

const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../build/CampaignFactory.json");
const compiledCampaign = require("../build/Campaign.json");

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: 5000000 });

    await factory.methods
        .createCampaign(
            "This is a test title",
            "This is a test description.",
            "",
            "Kanahaiya",
            "100"
        )
        .send({ from: accounts[0], gas: 5000000 });
    [campaignAddress] = await factory.methods.getAllCampaign().call();

    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress.campaignAddress
    );
});

describe("Campaign", () => {
    it("should check deployment of factory and campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("should marks caller as the campaign manager", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("should allow people to contribute money and mark them as approver", async () => {
        await campaign.methods
            .contribute()
            .send({ from: accounts[1], value: "5000" });
        const isApprover = await campaign.methods.approvers(accounts[1]).call();
        assert(isApprover);
    });

    it("should require a minimum contribution", async () => {
        try {
            await campaign.methods
                .contribute()
                .send({ from: accounts[1], value: "1" });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it("should allows a manager to make a payment request and throw an error if someone else makes the request", async () => {
        await campaign.methods
            .createRequest("Buy Batteries", "100", accounts[2])
            .send({ from: accounts[0], gas: "10000000" });

        const request = await campaign.methods.transferRequestArray(0).call();
        assert.equal("Buy Batteries", request.description);

        try {
            await campaign.methods
                .createRequest("Buy Batteries", "100", accounts[2])
                .send({ from: accounts[5], gas: "10000000" });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it("should process a complete request", async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether"),
        });

        await campaign.methods
            .createRequest(
                "Some requirement",
                web3.utils.toWei("4", "ether"),
                accounts[4]
            )
            .send({ from: accounts[0], gas: "1000000" });

        await campaign.methods
            .approveRequest(0)
            .send({ from: accounts[0], gas: "1000000" });

        await campaign.methods
            .finalizeRequest(0)
            .send({ from: accounts[0], gas: "1000000" });

        let balance = await web3.eth.getBalance(accounts[4]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 103);
    });

    it("should check the details of the campaign", async () => {
        const details = await campaign.methods.campaignDetails().call();
        assert.equal(details.title, "This is a test title");
        assert.equal(details.ownerName, "Kanahaiya");
    });
});
