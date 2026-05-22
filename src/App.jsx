import { WalletConnect } from '../utils/Wallet'
import { AccountBalance } from './components/Account Information/Account_Balance'
import { TokenSupply } from './components/Token Information/Token_Supply'
import { Toaster } from 'react-hot-toast'
import { TokenSupplyOfAnAddress } from './components/Token Information/Token_Supply_Of_An_Address'
import { TransactionListing } from './components/Account Information/Transaction_Listings'
import { BlockNumber } from './components/Get Information About Eth/eth_blockNumber'
import "./App.css"

function App() {
  return (
    <>
    <div className='header-container'>
    <h1>Etherscan Api App (Sepolia)</h1>
    </div>
      <WalletConnect>
        <div className='app-container'>
          <div className='components-grid'>

            <div className='component-card'>
              <p>Get Ether Balance Of Your Account</p>
              <AccountBalance></AccountBalance>
            </div>

            <div className='component-card'>
              <p>Get List Of All The Transactions</p>
              <TransactionListing></TransactionListing>
            </div>

            <div className='component-card'>
              <p>Get Total Coins In Circulation(Erc-20)</p>
              <TokenSupply></TokenSupply>
            </div>

            <div className='component-card'>
              <p>Get Coins Hold By An Address(Erc-20)</p>
              <TokenSupplyOfAnAddress></TokenSupplyOfAnAddress>
            </div>           

            <div className='component-card'>
              <p>Get Information About Ether</p>
            <BlockNumber></BlockNumber>
            </div>

          </div>
        </div>
      <Toaster></Toaster>
      </WalletConnect>

</>
  )
}

export default App
