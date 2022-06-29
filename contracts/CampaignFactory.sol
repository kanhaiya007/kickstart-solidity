//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "./Campaign.sol";

contract CampaignFactory {
    struct CampaignModal {
        //@dev Passable parameters to Campaign
        string title;
        string description;
        string imageURL;
        string ownerName;
        uint256 amountNeeded;
        //@dev Campaign Address added, to return in a single call
        Campaign campaignAddress;
    }

    uint256 public totalValueAsked;

    CampaignModal[] public deployedCampaigns;

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _imageURL,
        string memory _ownerName,
        uint256 _amountNeeded
    ) public {
        require(bytes(_title).length != 0, "Title should be provided");
        require(
            bytes(_description).length != 0,
            "Campaign should have a proper description."
        );
        require(
            _amountNeeded != 0,
            "It's Illigal to create a contract with no amount."
        );
        Campaign campaignAddress = new Campaign(
            _title,
            _description,
            _imageURL,
            _ownerName,
            _amountNeeded,
            msg.sender
        );
        CampaignModal memory cm = CampaignModal({
            title: _title,
            description: _description,
            imageURL: _imageURL,
            ownerName: _ownerName,
            amountNeeded: _amountNeeded,
            campaignAddress: campaignAddress
        });
        totalValueAsked += _amountNeeded;
        deployedCampaigns.push(cm);
    }

    function getAllCampaign() public view returns (CampaignModal[] memory) {
        return deployedCampaigns;
    }
}
