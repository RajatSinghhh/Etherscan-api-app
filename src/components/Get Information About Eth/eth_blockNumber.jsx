import axios from "axios"
import toast from "react-hot-toast"
import { useState,useContext } from "react"
import { Web3Context } from "../../../utils/createContext"

export const BlockNumber = () => {
    const[blockNumber,setBlockNumber] = useState(0)
    const[blockInfo,setBlockInfo] = useState("")
    const selectedAccount = useContext(Web3Context)

    async function getBlockNumber(){
        if(!selectedAccount){
            console.log("Please Install Metamask")
            toast.error("Please Install Metamask")
        }

        try{
          const toastLoading = toast.loading("Fetching Block Number...")
            const url = "https://api.etherscan.io/v2/api?chainid=11155111&module=proxy&action=eth_blockNumber&apikey=SARQ7AISDVMBNQKNB3D5XMC14U5WTS6BXJ"
            const res = await axios.get(url)
            if(res.data.result){
                setBlockNumber(res.data.result)
                toast.success("Block Number Fetched Successfully",{id:toastLoading})
                console.log(res.data.result)
            }
            else{
                setBlockNumber("Undefined")
            }
            
        }
        catch(error){
            console.log(error)
            toast.error("Failed to fetch info Please visit console",{id:toastLoading})
        }
    }

    async function getInfoAboutLatestBlock() {
        if(!selectedAccount){
            console.log("Please Install Metamask")
            toast.error("Please Install Metamask")
        }

        try{
          const toastLoading = toast.loading("Fetching Block Info...")
            if(blockNumber){
                const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=SARQ7AISDVMBNQKNB3D5XMC14U5WTS6BXJ`
                const res = await axios.get(url)
                if(res.data.result){
                    setBlockInfo(res.data.result)
                    toast.success("Block Info Fetched Successfully",{id:toastLoading})
                    console.log(res.data.result)
                }
            } else {
                toast.error("Failed to fetch infos Click On Block Number First",{id:toastLoading})
                setBlockInfo("Undefined")
            }

        }
        catch(error){
            console.log(error)
            toast.error("Failed to fetch info Please visit console",{id:toastLoading})
        }
        
    }

    return(
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 m-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-violet-500/20 max-w-4xl mx-auto space-y-6">
    
    {/* Block Number Section - UNTOUCHED */}
    <div className="space-y-4">
      <button 
        onClick={getBlockNumber}
        className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-violet-500/30 w-full"
      >
        Check Latest Block Number
      </button>
      <p className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
        Latest Block Number is: <span className="text-pink-300 font-bold">{parseInt(blockNumber,16)}</span>
      </p>
    </div>

    {/* Block Info Section - UPDATED */}
    <div className="space-y-4">
      <button
        onClick={getInfoAboutLatestBlock}
        className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-indigo-500/30 w-full"
      >
        Check Info About Latest Block
      </button>

      {/* Only show info card if blockInfo exists */}
      {blockInfo && Object.keys(blockInfo).length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent text-center mb-4">
            Block Information
          </h3>

          {/* Block Hash */}
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Block Hash:</p>
            <p className="text-cyan-300 font-mono text-xs break-all">{blockInfo.hash}</p>
          </div>

          {/* Block Number (Hex to Decimal) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Block Number:</p>
              <p className="text-violet-400 font-semibold">{parseInt(blockInfo.number, 16)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Timestamp:</p>
              <p className="text-pink-400 font-semibold">
                {new Date(parseInt(blockInfo.timestamp, 16) * 1000).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Miner */}
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Miner (Validator):</p>
            <p className="text-green-300 font-mono text-xs break-all">{blockInfo.miner}</p>
          </div>

          {/* Gas Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Gas Used:</p>
              <p className="text-orange-400 font-semibold">{parseInt(blockInfo.gasUsed, 16).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Gas Limit:</p>
              <p className="text-yellow-400 font-semibold">{parseInt(blockInfo.gasLimit, 16).toLocaleString()}</p>
            </div>
          </div>

          {/* Base Fee Per Gas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Base Fee Per Gas:</p>
              <p className="text-blue-400 font-semibold">{parseInt(blockInfo.baseFeePerGas, 16)} Wei</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Block Size:</p>
              <p className="text-purple-400 font-semibold">{parseInt(blockInfo.size, 16)} bytes</p>
            </div>
          </div>

          {/* Transaction Count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Transactions:</p>
              <p className="text-indigo-400 font-semibold">{blockInfo.transactions.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Difficulty:</p>
              <p className="text-red-400 font-semibold">{parseInt(blockInfo.difficulty, 16).toLocaleString()}</p>
            </div>
          </div>

          {/* Parent Hash */}
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Parent Hash:</p>
            <p className="text-teal-300 font-mono text-xs break-all">{blockInfo.parentHash}</p>
          </div>
        </div>
      )}
    </div>
  </div>
)
}