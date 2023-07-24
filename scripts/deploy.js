// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

 async function getBalances(address)
 {
    const balanceBigInt=await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }
 
  async function consoleBalances(addresses)
  {
      let counter=0;
      for(const address of addresses){
        console.log(`Address ${counter} balance:`,await getBalances(address));
        counter++;
      }
  }
     
  async function consoleReviews(reviews)
  {
      for(const review of reviews)
      {
        const timestamp=review.timestamp;
        const name=review.name;
        const from=review.from;
        const message=review.message;
        console.log(
          `At ${timestamp},name ${name},address ${from},message ${message}`
        );

      }
  }

async function main()
{
  const [owner,from1,from2,from3]=await hre.ethers.getSigners();
  const product=await hre.ethers.getContractFactory("product");
  const contract=await product.deploy();
  
  await contract.deployed();
  console.log("Address of contract:",contract.address);

  const addresses=[
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before buying Product");
  await consoleBalances(addresses);

  const amount={ value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyProduct("from1","Quality is good",amount);
  await contract.connect(from2).buyProduct("from2","Product Expired",amount);
  await contract.connect(from3).buyProduct("from3","Product is awesome",amount);

  console.log("After buying Product");
  await consoleBalances(addresses);

  const reviews=await contract.getReviews();
  consoleReviews(reviews);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
