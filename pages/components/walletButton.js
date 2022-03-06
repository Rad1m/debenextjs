import React, { useState, useEffect } from "react";

// Import Web3
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError
} from "@web3-react/core";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from "@web3-react/injected-connector";

// Import MUI.com
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

// import helpers
import { ellipseAddress } from "../helpers/utilities";

export const injected = new InjectedConnector();

export const walletconnect = new WalletConnectProvider({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  rpc: { 42: process.env.API_KOVAN_URL }, // required
  network: "kovan",
  qrcode: true,
  pollingInterval: 15000,
});


function WalletButton() {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  // connect wallet
  async function connect() {
    // first we check for metamask
    // if no metamask then wallet connect
    if (typeof window.ethereum !== "undefined") {
      connectInjected();
    } else {
      connectWalletConnect();
    }
  }


  const connectInjected = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const connectWalletConnect = async () => {
    await walletconnect.enable();
    try {
      await activate(walletconnect);
      console.log("Activate walletconnect");
    } catch (ex) {
      console.log(ex);
    }
  };

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div>
      {active ? (
        <Tooltip title="Open settings">
          <Button variant="contained" color="success" sx={{ mx: 2 }}>
            {ellipseAddress("" + account.toString(), 6)}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Connect wallet">
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 2 }}
            onClick={connect}
          >
            Connect
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
export default WalletButton;
