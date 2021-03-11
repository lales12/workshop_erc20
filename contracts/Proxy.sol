pragma solidity >=0.4.22 <0.8.0;

import "./ERC20.sol";

contract Proxy {
    address erc20Address;

    constructor() public {
    }

    function deployNewContract(
        string memory ownerName
    )
        public
    {
        ERC20 deployedContract = new ERC20(ownerName);

        erc20Address = address(deployedContract);
    }

    function getContractAddress()
        public
        view
        returns (address)
    {
        return erc20Address;
    }
}
