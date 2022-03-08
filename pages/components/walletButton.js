import React, { useState, useEffect } from "react";

// Import Web3
import { useWeb3React } from "@web3-react/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  InjectedConnector,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

// Import MUI.com
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSnackbar } from "notistack";

// import helpers
import { ellipseAddress } from "../helpers/utilities";

export const injected = new InjectedConnector();

export const provider = new WalletConnectProvider({
  infuraId: process.env.WEB3_INFURA_PROJECT_ID,
  rpc: { 42: process.env.API_KOVAN_URL }, // required
  network: "kovan",
  qrcode: true,
  pollingInterval: 15000,
});

////////////////////////////////
//  THE FUNCTION STARTS HERE  //
////////////////////////////////
function WalletButton() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // define walletconnect constants
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
      enqueueSnackbar("Metamask connected", { variant: "success" });
    } catch (ex) {
      console.log(ex);
      enqueueSnackbar("Operation not successful", { variant: "error" });
    }
  };

  const connectWalletConnect = async () => {
    try {
      await provider.enable();
      enqueueSnackbar("Wallet connected", { variant: "success" });
    } catch (ex) {
      console.log(ex);
      enqueueSnackbar("Operation not successful", { variant: "error" });
    }
  };

  async function disconnect() {
    try {
      deactivate();
      enqueueSnackbar("Wallet disconnected", { variant: "warning" });
    } catch (ex) {
      console.log(ex);
      enqueueSnackbar("Operation not successful", { variant: "error" });
    }
  }

  return (
    <div>
      {active ? (
        <div>
          <Button
            variant="contained"
            color="success"
            sx={{ mx: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {ellipseAddress("" + account.toString(), 6)}
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
            <MenuItem onClick={disconnect}>Log Out</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            color="inverted"
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
