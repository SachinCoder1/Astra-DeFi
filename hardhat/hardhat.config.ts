import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";
dotenv.config();

const SEPOLIA_PRIVATE_KEY = process.env.MODE_SEPOLIA_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    modeTestnet: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    modeMainnet: {
      url: "https://mainnet.mode.network",
      chainId: 34443,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    baseTestnet: {
      url: "https://sepolia.base.org",
      chainId: 84532,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    baseMainnet: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  sourcify: { enabled: true },
};

export default config;
