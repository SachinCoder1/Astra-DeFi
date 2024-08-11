# AstraDeFi

AstraDeFi is a decentralized finance (DeFi) platform designed to provide users with a comprehensive suite of financial tools, including staking, liquidity provision, AMM pools, and token swapping. Built on modern technologies and integrated with leading blockchain solutions, AstraDeFi aims to deliver a seamless and secure DeFi experience.

With AstraDeFi, users can:

- **Stake tokens** to earn rewards securely and efficiently.
- **Provide liquidity** to AMM pools, contributing to the decentralized trading ecosystem while earning a share of the transaction fees.
- **Swap tokens** with low fees and minimal slippage using our integrated AMM technology.
- **Access real-time analytics** to make informed decisions about their investments and track key metrics like TVL and trading volumes.


## Technologies Used

AstraDeFi leverages a robust stack of technologies to ensure a high-performance, scalable, and user-friendly platform:

- **Frontend**: Built using **Next.js** and **TypeScript** for a responsive and efficient user interface. **WalletConnect** and **Web3Modal** are integrated to provide seamless wallet interactions, while **GraphQL** powers the data querying layer, ensuring fast and efficient data retrieval.

- **Blockchain**: Smart contracts are developed using **Solidity** and deployed on the **Mode** and **Base** testnets. **Hardhat** is utilized for testing and deployment, ensuring a reliable and secure contract environment.

- **Data and Analytics**: Subgraphs deployed on **Goldsky** are used to track key metrics such as TVL, volume, and event data, providing users with accurate and up-to-date insights.

## Partnership Integrations

AstraDeFi is built with the support of several key partners who provided the tools and infrastructure that make the platform robust and reliable:

<table>
  <tr>
    <td style="text-align: center;">
      <strong>Optimism</strong><br>
      <img src="https://user-images.githubusercontent.com/1300064/219575413-d7990d69-1d21-44ef-a2b1-e9c682c79802.svg" width="150">
    </td>
    <td style="text-align: center;">
      <strong>Base</strong><br>
      <img src="https://avatars.githubusercontent.com/u/108554348?s=200&v=4" width="150">
    </td>
    <td style="text-align: center;">
      <strong>Goldsky</strong><br>
      <img src="https://ethglobal.b-cdn.net/organizations/eirr9/square-logo/default.png" width="150">
    </td>
    <td style="text-align: center;">
      <strong>Mode</strong><br>
      <img src="https://ethglobal.b-cdn.net/organizations/0vx1d/square-logo/default.png" width="150">
    </td>
    <td style="text-align: center;">
      <strong>Blockscout</strong><br>
      <img src="https://ethglobal.b-cdn.net/organizations/8kguf/square-logo/default.png" width="150">
    </td>
  </tr>
</table>


## Contract Addresses

AstraDeFi supports multiple chains, with specific contract addresses for each:

- **Chain 919 (Mode Sepolia Testnet)**:
  - Staking Token Contract Address: `0x74df726F77387ebDA41b0b52056A862f41237C0d`
  - Reward Token Address: `0x742Df2E9B29bA22687FC509f9356776176273DaB`
  - Staking Address: `0xdfE84AAb2A3E9Db1b35A64Ccf05faB6bFfBb63b7`
  - Faucet Contract Address: `0xafA061A7127C0b1929FA9068413ccF1C9335a368`
  - AMM Contract Address: `0x669C5f1a698Ab3a56A1a85b64dCFFE5fE2bB7e1F`
  - Block Explorer: [Mode Sepolia Explorer](https://sepolia.explorer.mode.network)

- **Chain 84532 (Base Sepolia Testnet)**:
  - Staking Token Contract Address: `0x09572c39b311834047b694EC77A614822ffBb1ff`
  - Reward Token Address: `0xc0C357bCCc6CFfeef97b792c72774b4c47B3D884`
  - Staking Address: `0x3B61C76fAD6c88FA565Ed538524d10C25f63ee75`
  - Faucet Contract Address: `0xBD22719907F3839EEc1f7482Af0788e26ed447F9`
  - AMM Contract Address: `0x21fb6F632054669EA240adAF0BCd6930Ba029A82`
  - Block Explorer: [Base Sepolia Blockscout](https://base-sepolia.blockscout.com)
 
## Getting Started

To get started with AstraDeFi, you can clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/your-repo/astradefi.git
cd astradefi
npm install

