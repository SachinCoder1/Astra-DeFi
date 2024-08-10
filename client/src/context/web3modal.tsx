"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "your_project_id";

// 2. Set chains

const modeSepolia = {
  chainId: 919,
  name: "Mode Testnet",
  currency: "ETH",
  explorerUrl: "https://sepolia.explorer.mode.network",
  rpcUrl: "https://sepolia.mode.network",
};

const baseSepolia = {
  chainId: 84532,
  name: "Base Sepolia",
  currency: "ETH",
  explorerUrl: "https://base-sepolia.blockscout.com",
  rpcUrl: "https://sepolia.base.org",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com"],
};
const chains = [modeSepolia,baseSepolia];
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  // rpcUrl: "...", // used for the Coinbase SDK
  // defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
  // allowUnsupportedChain: false,
});

type Props = {
  children: React.ReactNode;
};

export function Web3Modal({ children }: Props) {
  return children;
}
