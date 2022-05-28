//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint256 _amountNeeded) public {
        Campaign campaign = new Campaign(_amountNeeded, msg.sender);
        deployedCampaigns.push(campaign);
    }

    function getAllCampaign() public view returns (Campaign[] memory campaign) {
        return deployedCampaigns;
    }
}
