import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

// Base Mainnet Chain ID and RPC URL
const BASE_CHAIN_ID = 8453;
// Use a public RPC or your own provider URL
const BASE_RPC_URL =
  import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org";

export const [metaMask, hooksMetaMask] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

export const [walletConnectV2, hooksWalletConnectV2] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // Your WalletConnect Cloud Project ID
        chains: [BASE_CHAIN_ID],
        optionalChains: [BASE_CHAIN_ID], // Can add other chains if needed later
        rpcMap: {
          [BASE_CHAIN_ID]: BASE_RPC_URL,
        },
        showQrModal: true,
      },
    })
);

export const connectors = [
  [metaMask, hooksMetaMask],
  [walletConnectV2, hooksWalletConnectV2],
];
