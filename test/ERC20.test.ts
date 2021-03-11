contract('ERC 20 contract', (accounts) => {
    const ERC20Artifact = artifacts.require('ERC20');
    const ProxyArtifact = artifacts.require('Proxy');

    const deployer = accounts[0];
    const secondaryAccount = accounts[1];

    const ownerName = 'Alex';

    let erc20Contract;

    beforeEach(async () => {
        erc20Contract = await ERC20Artifact.new(ownerName);
    });

    it('Check if it is deployed susccessfully', async () => {
        assert.ok(erc20Contract.address);
    });

    it('Check if the contract address is the same than the function', async () => {
        const contractAddress = await erc20Contract.getAddress();

        assert.equal(erc20Contract.address, contractAddress);
    });

    it('Deploy ERC20 from proxy', async () => {
        const proxyContract = await ProxyArtifact.new();

        await proxyContract.deployNewContract(ownerName);
        const erc20ContractAddress = await proxyContract.getContractAddress();

        const erc20Contract = await ERC20Artifact.at(erc20ContractAddress);

        assert.ok(erc20Contract.address);

        const sender = await erc20Contract.getSeder();
        const origin = await erc20Contract.getTxOrigin();

        assert.equal(sender, proxyContract.address);
        assert.equal(origin, deployer);

        // This must fail
        // assert.equal(origin, proxyContract.address);
        // assert.equal(sender , deployer);
    });

    it('Try to store data from non deployed address', async () => {
        const storedData = 20;

        try {
            await erc20Contract.storeProtectedData(storedData, {
                from: secondaryAccount,
            });
        } catch {
            assert.ok('The transaction fails');

            return;
        }

        assert.fail('Transaction success');
    });

    it('Try to store data from owner account', async () => {
        const storedData = 20;

        await erc20Contract.storeProtectedData(storedData);

        const storedContractValue = await erc20Contract.protectedData();

        assert.equal(storedContractValue, storedData);
    });
});
