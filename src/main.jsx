import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from 'thirdweb/react'
import { base } from "thirdweb/chains";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider
        activeChain={base}
        supportedChains={[base]}
        clientId={clientId}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
)
