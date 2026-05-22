export const connectWallet = async () => {
    try {
        if (!window.ethereum.isMetaMask) {
            console.log("Please Install Metamask")
        }
        const account = await window.ethereum.request({ method: "eth_requestAccounts" })
        const selectedAccount = account[0]
        if (!selectedAccount) {
            console.log("No Accounts Found")
        }
        console.log(selectedAccount)
        return {selectedAccount}
    }
    catch (error) {
        console.log(error.message, "Error Connecting to Wallet")
    }
}