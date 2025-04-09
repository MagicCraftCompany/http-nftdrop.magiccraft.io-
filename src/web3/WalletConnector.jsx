import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { metaMask, walletConnectV2 } from './connectors'

function WalletConnector() {
  const { connector, account, isActive, provider, chainId } = useWeb3React()

  const connectMetaMask = async () => {
    try {
      await metaMask.activate()
    } catch (error) {
      console.error('Failed to connect MetaMask:', error)
      // Handle specific errors like user rejection
      if (error.code === 4001) {
        alert("Connection rejected by user.")
      }
    }
  }

  const connectWalletConnect = async () => {
    try {
      // You might need to specify the desired chainId when activating WalletConnect
      await walletConnectV2.activate(8453) // Explicitly activate on Base
    } catch (error) {
      console.error('Failed to connect WalletConnect:', error)
       if (error.code === 4001) { 
        alert("Connection rejected by user.")
      } else if (error.message.includes('User closed modal')) {
        // WalletConnect modal closed
        console.log("WalletConnect modal closed by user.");
      } else {
        alert(`WalletConnect connection failed: ${error.message}`);
      }
    }
  }

  const disconnect = () => {
    if (connector?.deactivate) {
      connector.deactivate()
    } else if (connector?.resetState) {
      // For connectors that don't have deactivate (like WalletConnect v2)
      connector.resetState()
    }
     // Optional: Clear any app-specific state related to the connection
  }

  return (
    <div className="wallet-connector">
      {isActive ? (
        <div>
          <p>Connected: {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Yes'}</p>
          <p>Chain ID: {chainId}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <p>Wallet not connected</p>
          <button onClick={connectMetaMask}>Connect MetaMask</button>
          <button onClick={connectWalletConnect}>Connect WalletConnect</button>
        </div>
      )}
    </div>
  )
}

export default WalletConnector 