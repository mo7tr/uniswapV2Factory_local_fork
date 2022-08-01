const Dai = artifacts.require("Dai");
const Bat = artifacts.require("Bat");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Dai);
  const daiInstance = await Dai.deployed();
  console.log("dai address =>", daiInstance.address);
  await daiInstance.faucet(accounts[0], 1000);
  const balanceDai = await daiInstance.balanceOf(accounts[0]);
  console.log("balanceDai accounts0 =>", balanceDai.toString());

  await deployer.deploy(Bat);
  const batInstance = await Bat.deployed();
  console.log("bat Address =>", batInstance.address);
  await batInstance.faucet(accounts[0], 1000);
  const balanceBat = await batInstance.balanceOf(accounts[0]);
  console.log("balanceBat accounts0 =>", balanceBat.toString());
};
