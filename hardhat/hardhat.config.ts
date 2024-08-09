import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";
dotenv.config();

const MODE_SEPOLIA_PRIVATE_KEY = process.env.MODE_SEPOLIA_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    modeTestnet: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts: [MODE_SEPOLIA_PRIVATE_KEY],
    },
    modeMainnet: {
      url: "https://mainnet.mode.network/",
      chainId: 34443,
      accounts: [MODE_SEPOLIA_PRIVATE_KEY],
    },
  },
  sourcify: { enabled: true },
};

export default config;
