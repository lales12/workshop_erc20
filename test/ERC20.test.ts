contract('ERC 20 contract', (accounts) => {
    const ERC20Artifact = artifacts.require('ERC20');
    const ProxyArtifact = artifacts.require('Proxy');

    const deployer = accounts[0];

    it('Check if it is deployed susccessfully', async () => {
        const erc20Contract = await ERC20Artifact.new();

        assert.ok(erc20Contract.address);
    });

    it('Check if the contract address is the same than the function', async () => {
        const erc20Contract = await ERC20Artifact.new();
        const contractAddress = await erc20Contract.getAddress();

        assert.equal(erc20Contract.address, contractAddress);
    });

    it('Deploy ERC20 from proxy', async () => {
        const proxyContract = await ProxyArtifact.new();

        await proxyContract.deployNewContract();
        const erc20ContractAddress = await proxyContract.getContractAddress();

        const erc20Contract = await ERC20Artifact.at(erc20ContractAddress);

        assert.ok(erc20Contract.address);

        const sender = await erc20Contract.getSeder();
        const origin = await erc20Contract.getTxOrigin();

        assert.equal(sender, proxyContract.address);
        assert.equal(origin, deployer);

        This must fail
        assert.equal(sender, proxyContract.address);
        assert.equal(origin, deployer);
    });
});
