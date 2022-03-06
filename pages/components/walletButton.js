import React, { useState, useEffect } from "react";

// Import Web3
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

// Import MUI.com
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Alert from '@mui/material/Alert';

import wcIcon from "../../icons/walletconnect-logo.svg";
import mmIcon from "../../icons/mm-logo.svg";

// import helpers
import { ellipseAddress } from "../helpers/utilities";
import { Snackbar } from "@mui/material";

export const injected = new InjectedConnector();

export const provider = new WalletConnectProvider({
  infuraId: process.env.WEB3_INFURA_PROJECT_ID,
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
    error,
  } = useWeb3React();

  // select a wallet here
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleMetamask = async () => {
    setAnchorEl(null);
    connectInjected();
  };

  const handleWalletConect = async () => {
    connectWalletConnect();
    setAnchorEl(null);
  };

  // connect wallet
  const connectInjected = async () => {
    try {
      await activate(injected);
      <Alert severity="success">This is a success alert — check it out!</Alert>
    } catch (ex) {
      console.log(ex);
    }
  };

  const connectWalletConnect = async () => {
    try {
      await provider.enable();
      // await activate(provider);
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
        <div>
        <Button
          variant="contained"
          color="success" sx={{ mx: 2 }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
            {ellipseAddress("" + account.toString(), 6)}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          <MenuItem onClick={disconnect}>Log Out</MenuItem>
        </Menu>
        
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Connect
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleMetamask}>Metamask</MenuItem>
            <MenuItem onClick={handleWalletConect}>WalletConnect</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
export default WalletButton;
