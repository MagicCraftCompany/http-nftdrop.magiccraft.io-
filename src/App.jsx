import React, { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import ClaimButton from './components/ClaimButton'
import { useActiveAccount, useActiveWalletChain, ConnectButton } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
import { base } from 'thirdweb/chains'

const NFT_IMAGE_URL = 'https://magiccraft.mypinata.cloud/ipfs/bafybeid5d73woo55httmpa7mqgnr5geydhcsgrx4vkhdlstvsejf55rdta';
const CONTRACT_ADDRESS = '0x689ca50d702801eE119f3156e0cf90490d74b1Aa';

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const client = createThirdwebClient({ clientId });

function App() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const isConnected = !!account;
  const isCorrectChain = activeChain?.id === base.id;

  const [tasksCompleted, setTasksCompleted] = useState(false);

  const handleTasksComplete = (allComplete) => {
    setTasksCompleted(allComplete);
  };

  console.log("--- Button State Check ---");
  console.log("isConnected:", isConnected);
  console.log("tasksCompleted:", tasksCompleted);
  console.log("isCorrectChain:", isCorrectChain);
  console.log("Active Chain ID:", activeChain?.id);
  console.log("Required Chain ID (Base):", base.id);
  console.log("--------------------------");

  return (
    <div className="App">
      <h1>Claim Your MagicCraft NFT on Base!</h1>
      <img src={NFT_IMAGE_URL} alt="MagicCraft NFT" className="nft-image" />

      <div className="connect-button-container">
        <ConnectButton
          client={client}
          chain={base}
          appMetadata={{
            name: "MagicCraft Claim",
            url: window.location.origin,
          }}
        />
      </div>

      <TaskList onTasksComplete={handleTasksComplete} />

      <ClaimButton
        contractAddress={CONTRACT_ADDRESS}
        isDisabled={!isConnected || !tasksCompleted || !isCorrectChain}
      />
    </div>
  )
}

export default App
