import { useState } from "react"
import { connectWallet } from "./connectWallet"
import { Web3Context } from "./createContext"
import toast from "react-hot-toast"
import { Button } from "./Button"

export const WalletConnect = ({children}) => {
    const[state,setState] = useState("")
    async function connect() {
        try{
            const {selectedAccount} = await connectWallet()
            setState(selectedAccount)
            toast.success(`Connected with Account: ${selectedAccount}`)
        }
        catch(error){
            console.log(error)
            toast.error("Error Connecting With Metamask open console and refresh page")
        }
        
    }
    return (
        <div>
            <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
            <Button onClick={connect}
            label={state ? "Connected" : "Connect Account"}
            ></Button>
        </div>
    )
}
