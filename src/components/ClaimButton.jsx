import React, { useState, useEffect } from 'react';
// Remove ethers import
// import { ethers } from 'ethers';
import './ClaimButton.css';
// Import Thirdweb hooks and functions
import { useSendTransaction } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721"; // Assuming standard ERC721 Drop
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains"; // Import base chain for contract
import { createThirdwebClient } from 'thirdweb'; // Import client for contract
import { useActiveAccount } from "thirdweb/react"; // To get the receiver address


// Remove ABI and ZERO_ADDRESS
// const contractABI = [...];
// const ZERO_ADDRESS = '...';

// Define client for contract interaction (can also be passed as prop if preferred)
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const client = createThirdwebClient({ clientId });

// Update props - remove account and provider
function ClaimButton({ contractAddress, isDisabled }) {
  // Get mutation hook
  const { mutate: sendTx, isPending, isSuccess, isError, error, data: transactionResult } = useSendTransaction();
  const account = useActiveAccount(); // Get the connected account

  // Local state for user feedback messages
  const [claimMessage, setClaimMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  // Get contract instance
  const contract = getContract({
      client,
      chain: base, // Specify the chain the contract is on
      address: contractAddress,
  });

  const handleClaim = async () => {
    if (!account) {
        setClaimMessage('Please connect your wallet first.');
        return;
    }
    if (!contract) {
        setClaimMessage('Contract not ready.');
        return;
    }

    setClaimMessage(''); // Clear previous messages
    setTxHash('');

    // Prepare the transaction using the claimTo helper
    const tx = claimTo({
        contract: contract,
        to: account.address, // Claim to the connected address
        quantity: 1n, // Claim 1 NFT (use BigInt notation 'n')
    });

    // Send the transaction using the hook
    sendTx(tx);
  };

   // Effect to update UI based on transaction status from the hook
   useEffect(() => {
    if (isPending) {
      setClaimMessage('Sending transaction... Please confirm in your wallet.');
      setTxHash('');
    } else if (isSuccess && transactionResult) {
      setClaimMessage('NFT Claimed Successfully!');
      setTxHash(transactionResult.transactionHash);
      console.log("Transaction successful:", transactionResult);
    } else if (isError) {
      console.error('Claim failed:', error);
      let message = 'Claim failed. ';
      // Basic error handling, can be more specific
       if (error?.message.includes('rejected')) {
          message += 'Transaction rejected by user.';
      } else if (error?.message.includes('ClaimConditionNotMet')) {
           message += 'Claim conditions not met. Check active claim phase requirements (price, allowlist, timing, etc.).';
      } else {
          message += error?.message || 'Unknown error.';
      }
      setClaimMessage(message);
      setTxHash('');
    }
  }, [isPending, isSuccess, isError, error, transactionResult]);


  return (
    <div className="claim-section">
      <button
        className="claim-button"
        onClick={handleClaim}
        // Disable button if prop requires or transaction is pending
        disabled={isDisabled || isPending}
      >
        {isPending ? 'Claiming...' : 'Claim NFT'}
      </button>
      {/* Display message */}
      {claimMessage && <p className="claim-status">{claimMessage}</p>}
      {/* Display transaction hash link if available */}
      {txHash && (
        <p className="claim-status">
          Transaction Hash: <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a>
        </p>
      )}
    </div>
  );
}

export default ClaimButton; 