import axios from "axios"
import { useState,useContext } from "react"
import { Web3Context } from "../../../utils/createContext"
import toast from "react-hot-toast"
import { ethers } from "ethers"

export const TokenSupplyOfAnAddress = () => {
    const[tokenBalance,setTokenBalance] = useState(0)
    const[contractAddress,setContractAddress] = useState("")
    const[tokenAddress,setTokenAddress] = useState("")
    const selectedAccount = useContext(Web3Context)
    
    async function getTokenSupply(e) {
        e.preventDefault()
        if(!selectedAccount){
            toast.error("Please Connect Metamask")
            console.log("Please Connect Metamask")
        }

        try{
        const toastLoading = toast.loading("Fetching Coin Supply...")
        const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${tokenAddress}&tag=latest&apikey=SARQ7AISDVMBNQKNB3D5XMC14U5WTS6BXJ`
        const res = await axios.get(url)            
        if(res.data.status == "1"){
            const tokenSupply = res.data.result
            const tokenSupplyInEthType = ethers.formatEther(tokenSupply)
            setTokenBalance(tokenSupplyInEthType)            
            toast.success("Token Supply Fetched",{id:toastLoading})
            console.log(res.data.result)
        }
        else{
            setTokenBalance("undefined")
            toast.error("Failed to fetch Token Supply || Please fill contract and token address box properly",{id:toastLoading})
        }  
    }
    catch(error){
            console.log(error)
            toast.error("Failed to fetch Token Supply || Please visit console")
    }     
 }
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 m-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-teal-500/20 max-w-md mx-auto">
  <form onSubmit={getTokenSupply} className="space-y-4 mb-6">

    <input
      type="text"
      placeholder="Enter Coin's Contract Address"
      value={contractAddress}
      onChange={(e) => setContractAddress(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
    />

    <input
      type="text"
      placeholder="Enter Account Address"
      value={tokenAddress}
      onChange={(e) => setTokenAddress(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
    />

    <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-teal-500/30 w-full">
      Check Coins
    </button>

  </form>

  <p className="text-lg font-semibold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
    Coins held are: <span className="text-green-300 font-bold">{tokenBalance}</span> coins
  </p>
</div>
    
    )
}
