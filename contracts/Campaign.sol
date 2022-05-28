//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    mapping(uint256 => Request) public requestArray;

    address public manager;
    uint256 public amountNeeded;
    uint256 private minimumContribution = 2;
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

    constructor(uint256 _amountNeeded, address _manager) {
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
        Request storage newRequest = requestArray[requestCount++];
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
        Request storage request = requestArray[_requestId];
        require(
            !request.approvals[msg.sender],
            "You have already casted your vote for this request."
        );
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 _requestId) public onlyManager {
        Request storage request = requestArray[_requestId];
        require(!request.complete, "This request has already been completed");
        require(
            request.approvalCount > (approversCount / 2),
            "Unable to match minimum number of votes to finalize this request."
        );
        request.complete = true;
        request.recipient.transfer(request.value);
    }
}
