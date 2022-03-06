import Web3Modal from "web3modal";
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
