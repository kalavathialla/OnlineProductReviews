const hre = require("hardhat");

async function main(){
    const product = await hre.ethers.getContractFactory("product");
    const contract = await product.deploy();

    await contract.deployed();
    console.log("Address of Contract:", contract.address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });