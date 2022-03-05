import Web3Modal from "web3modal";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { ellipseAddress } from "../helpers/utilities";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: process.env.API_KOVAN_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [walletAddr, setwalletAddr] = useState("");

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
          <Button variant="contained" color="success" sx={{ mx: 2 }}>
            {ellipseAddress("" + walletAddr.toString(), 6)}
          </Button>
        ) : (
          <Tooltip title="Connect wallet">
            <Button
              variant="contained"
              color="secondary"
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
