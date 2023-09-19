// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;        

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }
    

    mapping(uint256 => Campaign) public campaigns;          //mapping for unique IDs

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;                    // _ indicating that variable is local
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.image = _image;
        campaign.amountCollected = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");    //payable = address capable of receiving ETH --- sent is true if transfer succesful

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {           //view = read only   memory = temporary storage
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}