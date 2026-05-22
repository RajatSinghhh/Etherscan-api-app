import axios from "axios"
import { useState,useContext } from "react"
import { Web3Context } from "../../../utils/createContext"
import toast from "react-hot-toast" 

export const AccountBalance = () => {
    const[balance,setBalance] = useState(0)
    const selectedAccount = useContext(Web3Context)         

      const getBalance = async() => {
        if(!selectedAccount) {
          toast.error("Please Install Metamask")
          console.log("Please Install Metamask")
      } 

        try{
        const loadingToast = toast.loading("Fetching Account Balance...")
        const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=balance&address=${selectedAccount}&tag=latest&apikey=SARQ7AISDVMBNQKNB3D5XMC14U5WTS6BXJ`                            
        const res = await axios.get(url)       
        const weiBalance = res.data.result
        console.log(weiBalance)
        const etherBalance = (parseInt(weiBalance) / 1e18).toFixed(4)
        setBalance(etherBalance)
        toast.success("Account Balance Fetched",{id:loadingToast})
    }
    catch(error){
            console.log(error)
            toast.error("Error Fetching Account Balance Please open console",{id:loadingToast})
    }     
 }
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 m-6 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 max-w-md mx-auto">
  <button 
    onClick={getBalance}
    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-emerald-500/30 mb-6 w-full"
  >
    Check Balance
  </button>
  
  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-xl p-4">        
    <p className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
      Account Balance is : <span className="text-cyan-300 font-bold">{balance}</span> Eth
    </p>
  </div>
</div>
    
    )
}
