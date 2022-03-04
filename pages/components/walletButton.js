import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const INFURA_ID = process.env.WEB3_INFURA_PROJECT_ID;
let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
  });
}

export default function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [walletAddr, setwalletAddr] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const walletAddr = await signer.getAddress();
        setwalletAddr(walletAddr);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          <h3>"Connected! " + {walletAddr}</h3>
        ) : (
          <Tooltip title="Connect wallet">
            <Button
              variant="contained"
              color="success"
              sx={{ mx: 2 }}
              onClick={() => connect()}
            >
              Connect
            </Button>
          </Tooltip>
        )
      ) : (
        <Button variant="contained" color="error" sx={{ mx: 2 }}>
          Install metamask
        </Button>
      )}
    </div>
  );
}
