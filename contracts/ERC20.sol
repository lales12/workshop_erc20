pragma solidity >=0.4.22 <0.8.0;


contract ERC20 {
    address owner;
    address txOrigin;

    uint256 public protectedData;

    string constant TOKEN_TYPE = 'ERC20';
    string ownerName;

    modifier _onlyOwner () {
        require(
            msg.sender == owner,
            "Only the owner can perform this acction"
        );
    
        _;
    }

    constructor(string memory _ownerName) public {
        owner = msg.sender;
        txOrigin = tx.origin;
        ownerName = _ownerName;
    }

    function storeProtectedData(
        uint256 _protectedData
    )
        public
        _onlyOwner
    {
        protectedData = _protectedData;
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
