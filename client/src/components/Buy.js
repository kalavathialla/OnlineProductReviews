import { ethers } from 'ethers';
const Buy=({state})=>{
    const buyProduct = async (event) => {
        event.preventDefault();
        const {contract}=state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        console.log(name,message,contract);
        const value= {value:ethers.utils.parseEther("0.001")};
        const transaction = await contract.buyProduct(name,message,value);
        await transaction.wait();
        console.log("Transaction is done");
    };
    
    return (
    <>
    <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyProduct}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Review"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};
export default Buy;