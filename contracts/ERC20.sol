pragma solidity >=0.4.22 <0.8.0;


contract ERC20 {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    function getAddress()
        public
        view
        returns (address)
    {
        return address(this);
    }
}
