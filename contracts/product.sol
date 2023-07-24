//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 < 0.9.0;
//pragma experimental ABIEncoderV2;

contract product{
    struct Review{
        string name;
        string message;
        uint timestamp;
        address from;
    }
    Review[] reviews;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function buyProduct(string memory name,string memory message)public payable{
        require(msg.value>0,"Please pay > 0 Ether");
        owner.transfer(msg.value);
        reviews.push(Review(name, message, block.timestamp, msg.sender));
    }

    function getReviews()public view returns(Review[] memory){
        return reviews;
    }
}