const Dai = artifacts.require("Dai");
const Bat = artifacts.require("Bat");

const json = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const contract = require("@truffle/contract");
const UniswapV2Factory = contract(json);

UniswapV2Factory.setProvider(web3._provider);

module.exports = async function (deployer, network, accounts) {
  batInstance = await Bat.deployed();
  daiInstance = await Dai.deployed();
  console.log("batInstance address =>", batInstance.address);
  console.log("daiInstance address =>", daiInstance.address);
  const balanceDai = await daiInstance.balanceOf(accounts[0]);
  const balanceBat = await batInstance.balanceOf(accounts[0]);
  console.log("balanceDai accounts0 =>", balanceDai.toString());
  console.log("balanceBat accounts0 =>", balanceBat.toString());

  console.log(1);

  await deployer.deploy(UniswapV2Factory, accounts[0], { from: accounts[0] });
  console.log(2);

  const UniswapV2FactoryInstance = await UniswapV2Factory.deployed();

  // const UniswapV2FactoryInstance = await UniswapV2Factory.new(accounts[0], {
  //   from: accounts[0],
  // });
  console.log(3);

  console.log(
    "UniswapV2FactoryInstance Address =>",
    UniswapV2FactoryInstance.address
  );
  console.log(4);

  const beforeCreatePair = await UniswapV2FactoryInstance.allPairsLength();
  console.log("beforeCreatePair length =>", beforeCreatePair.toString());

  const createPair = await UniswapV2FactoryInstance.createPair(
    batInstance.address,
    daiInstance.address,
    { from: accounts[0] }
  );
  console.log("createPair =>", createPair);

  const afterCreatePair = await UniswapV2FactoryInstance.allPairsLength();
  console.log("afterCreatePair length =>", afterCreatePair.toString());

  const pair0 = await UniswapV2FactoryInstance.allPairs[0];
  console.log("pair0 =>", pair0);
};
