pragma solidity >=0.4.22 <0.8.0;


contract ERC20 {
    address owner;
    address txOrigin;

    constructor() public {
        owner = msg.sender;
        txOrigin = tx.origin;
    }

    function getAddress()
        public
        view
        returns (address)
    {
        return address(this);
    }

    function getSeder()
        public
        view
        returns (address)
    {
        return owner;
    }

    function getTxOrigin()
        public
        view
        returns (address)
    {
        return txOrigin;
    }
}
