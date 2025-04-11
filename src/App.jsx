import React, { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import ClaimButton from './components/ClaimButton'
import Header from './components/Header'
import Footer from './components/Footer'
import { useActiveAccount, useActiveWalletChain, ConnectButton } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
import { defineChain } from 'thirdweb/chains'
import { createWallet, walletConnect } from "thirdweb/wallets";
import { GiBlackKnightHelm } from 'react-icons/gi'; // Import the icon
import { AiFillStar } from 'react-icons/ai'; // Import Star icon for Utility
import './components/ClaimButton.css';

const NFT_IMAGE_URL = '/nft.webp'; // Path to image in public folder
const CONTRACT_ADDRESS = '0x689ca50d702801eE119f3156e0cf90490d74b1Aa';

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
// If client ID is missing, show error or fallback
if (!clientId) {
  console.error("Missing VITE_THIRDWEB_CLIENT_ID in .env file");
  // You could render an error message here or provide a default behavior
}
const client = createThirdwebClient({ clientId });

// Use defineChain with explicit 'default' keys for RPC and explorer
const baseChain = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet.base.org"] } // Specify default RPC endpoint
  },
  blockExplorers: {
    default: { name: "Basescan", url: "https://basescan.org" } // Specify default block explorer
  }
});

const supportedWallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
];

function App() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();

  const isConnected = !!account;
  // Update chain ID check to use our custom baseChain object
  const isCorrectChain = activeChain?.id === baseChain.id;

  const [tasksCompleted, setTasksCompleted] = useState(false);

  const handleTasksComplete = (allComplete) => {
    setTasksCompleted(allComplete);
  };

  // Placeholder for available count - replace with actual logic if needed
  const availableCount = "1000+"; // Example placeholder
  const totalCount = "Claimable"; // Example placeholder
  const utilityDescription = "Unlocks the Davinci Skin"; // Utility text

  return (
    <>
      <Header>
        <ConnectButton
          client={client}
          // Use our custom baseChain object
          chain={baseChain}
          wallets={supportedWallets}
          appMetadata={{
            name: "MagicCraft Claim",
            url: window.location.origin,
          }}
          theme={"dark"}
          connectButton={{
             label: "Connect",
             className: "claim-button"
          }}
          detailsButton={{
              className: "claim-button"
          }}
        />
      </Header>

      <div className="App">
        <h1>MagicCraft & Davincij15 join forces!</h1>

        {/* --- Added Descriptive Banner --- */}
        <div className="description-banner">
          <img src={NFT_IMAGE_URL} alt="MagicCraft NFT" className="nft-image" /> {/* Moved image here */}
          <div className="banner-text">
            <h2>Mint on <span className="base-color">Base</span></h2>
            <p>
              Celebrate our collaboration with Davincij15 by completing the tasks below and claiming your exclusive NFT directly on the Base network. This NFT unlocks the new epic Davinci skin in the MagicCraft game, giving you a unique edge in the ecosystem.
            </p>
            {/* --- Info Containers --- */}
            <div className="info-container-wrapper">
              <div className="info-container available-container">
                <h5>
                  <GiBlackKnightHelm className="icon" />
                  Available:
                </h5>
                <h5>
                  {availableCount} {totalCount}
                </h5>
              </div>
              {/* --- Added Utility Container --- */}
              <div className="info-container utility-container">
                <h5>
                  <AiFillStar className="icon" />
                  Utility:
                </h5>
                <h5>
                  {utilityDescription}
                </h5>
              </div>
            </div>
            {/* --- End Info Containers --- */}
          </div>
        </div>
        {/* --- End Descriptive Banner --- */}

        <TaskList onTasksComplete={handleTasksComplete} />

        {/* Conditionally render ConnectButton or ClaimButton */}
        {(!isConnected && tasksCompleted) ? (
          // If tasks done but wallet not connected, show ConnectButton styled like ClaimButton
          <div className="claim-section"> {/* Use same wrapper class for spacing */}
            <ConnectButton
              client={client}
              // Use our custom baseChain object
              chain={baseChain}
              wallets={supportedWallets}
              appMetadata={{
                name: "MagicCraft Claim",
                url: window.location.origin,
              }}
              // Apply styles and label to make it look like the Claim button
              connectButton={{
                label: "Claim",
                className: "claim-button" // Apply the claim button class
              }}
              theme={"dark"} // Match theme
            />
          </div>
        ) : (
          // Otherwise, show the actual ClaimButton
          <ClaimButton
            contractAddress={CONTRACT_ADDRESS}
            // Disable if tasks incomplete OR (connected AND wrong chain)
            isDisabled={!tasksCompleted || (isConnected && !isCorrectChain)}
          />
        )}
      </div>

      <Footer />
    </>
  )
}

export default App
