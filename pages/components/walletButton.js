import * as React from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { injected } from "./connectors";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}

export default function WalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [address, setAddress] = useState(undefined);

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
        setSigner(provider.getSigner());
        setAddress(await signer.getAddress());
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
          "Address"
        ) : (
          <Tooltip title="Connect wallet">
            <Button
              variant="contained"
              sx={{ mx: 2 }}
              onClick={() => connect()}
            >
              Connect
            </Button>
          </Tooltip>
        )
      ) : (
        "Please install metamask"
      )}
      {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
}
