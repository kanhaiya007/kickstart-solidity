//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Campaign {
    struct TransferRequest {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    struct CampaignDetails {
        string title;
        string description;
        string imageURL;
        string ownerName;
    }

    CampaignDetails public campaignDetails;

    mapping(uint256 => TransferRequest) public transferRequestArray;

    address public manager;
    uint256 public amountNeeded = 1000;

    uint256 private minimumContribution;
    uint256 public requestCount;
    uint256 public approversCount;
    mapping(address => bool) public approvers;

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "This call is restricted to managers only."
        );
        _;
    }

    constructor(
        string memory _title,
        string memory _description,
        string memory _imageURL,
        string memory _ownerName,
        uint256 _amountNeeded,
        address _manager
    ) {
        campaignDetails = CampaignDetails({
            title: _title,
            description: _description,
            imageURL: _imageURL,
            ownerName: _ownerName
        });

        manager = _manager;
        amountNeeded = _amountNeeded;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Not matching minimum contribution criteria."
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint256 _value,
        address payable _recipient
    ) public onlyManager {
        TransferRequest storage newRequest = transferRequestArray[
            requestCount++
        ];
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.approvalCount = 0;
        newRequest.complete = false;
    }

    function approveRequest(uint256 _requestId) public {
        require(
            approvers[msg.sender],
            "You need to be an approver to approve this request."
        );
        TransferRequest storage request = transferRequestArray[_requestId];
        require(
            !request.approvals[msg.sender],
            "You have already casted your vote for this request."
        );
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 _requestId) public onlyManager {
        TransferRequest storage request = transferRequestArray[_requestId];
        require(!request.complete, "This request has already been completed");
        require(
            request.approvalCount > (approversCount / 2),
            "Unable to match minimum number of votes to finalize this request."
        );
        request.complete = true;
        request.recipient.transfer(request.value);
    }
}
