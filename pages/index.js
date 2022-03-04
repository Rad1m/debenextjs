import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import TokenArtifact from "./contracts/DeBeToken.json";
import TokenAddress from "./contracts/token-address.json";
import LotteryArtifact from "./contracts/Lottery.json";
import LotteryAddress from "./contracts/contract-address.json";
import ResponsiveAppBar from "./components/appbar";

export default function Home() {
  return (
    <div>
      <ResponsiveAppBar />
    </div>
  );
}
