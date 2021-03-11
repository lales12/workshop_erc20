contract('ERC 20 contract', () => {
    const ERC20Artifact = artifacts.require('ERC20');

    it('Check if it is deployed susccessfully', async () => {
        const erc20Contract = await ERC20Artifact.new();

        assert.ok(erc20Contract.address);
    });

    it('Check if the contract address is the same than the function', async () => {
        const erc20Contract = await ERC20Artifact.new();
        const contractAddress = await erc20Contract.getAddress();

        assert.equal(erc20Contract.address, contractAddress);
    });
});
