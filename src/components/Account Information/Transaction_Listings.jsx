import axios from "axios"
import { Web3Context } from "../../../utils/createContext"
import { useContext } from "react"
import { useState } from "react"
import toast from "react-hot-toast"

export const TransactionListing = () => {
    const selectedAccount = useContext(Web3Context)
  const[transactionList,setTransactionList] = useState([])    
    
    const getTransaction = async() => {
        if(!selectedAccount){
        toast("Please Connect To Metamask")
        console.log("Please Connect To Metamask")
    }
        try{
          const toastLoading = toast.loading("Fetching Transaction...")
            const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=txlist&address=${selectedAccount}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=SARQ7AISDVMBNQKNB3D5XMC14U5WTS6BXJ`
            const res = await axios.get(url)
            console.log(res.data.result)
            if(res.data.status == "1"){
                const listingTx  = res.data.result
                setTransactionList(listingTx)
                toast.success("Transaction Fetched Successfully",{id:toastLoading})
            }
            else{
                setTransactionList("Undefined")
            }                
    }
    catch(error){
        console.log(error)
        toast.error("Error Fetching Transactions please open console",{id:toastLoading})
    }
    
    } 

    return  (
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 m-6 shadow-2xl max-w-4xl mx-auto">
    <button
      onClick={getTransaction}
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-blue-500/30 mb-6 w-full"
    >
      Check Transactions
    </button>

    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
      Transactions List ({transactionList.length})
    </h2>

    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {transactionList.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No transactions found</p>
      ) : (
        transactionList.map((tx, index) => (
          <div
            key={tx.hash}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-blue-400 font-semibold">Transaction #{index + 1}</span>
              <span className={`px-2 py-1 rounded text-xs ${tx.isError === "0" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {tx.isError === "0" ? "Success" : "Failed"}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400">Hash:</span>
                <span className="text-purple-300 font-mono text-xs break-all">{tx.hash}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">From:</span>
                  <p className="text-blue-300 font-mono text-xs break-all">{tx.from}</p>
                </div>
                <div>
                  <span className="text-gray-400">To:</span>
                  <p className="text-indigo-300 font-mono text-xs break-all">{tx.to}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Value:</span>
                  <p className="text-green-400 font-semibold">
                    {(parseInt(tx.value) / 1e18).toFixed(4)} ETH
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Block:</span>
                  <p className="text-yellow-400">{tx.blockNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Gas Used:</span>
                  <p className="text-orange-400">{tx.gasUsed}</p>
                </div>
                <div>
                  <span className="text-gray-400">Timestamp:</span>
                  <p className="text-pink-400">
                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}