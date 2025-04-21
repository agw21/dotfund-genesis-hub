
# Walf Dot Fund - Blockchain Crowdfunding on Polkadot Asset Hub 🚀

## 🌟 Project Overview

DotFund is a decentralized crowdfunding platform built on the Polkadot Asset Hub, revolutionizing how entreprenuers raise funds and engage with their community. By leveraging blockchain technology, we provide a transparent, secure, and innovative funding mechanism.

## 🔑 Key Features

### 🎨 Open Edition NFT Campaigns
- Creators launch campaigns by minting NFTs at $1 per mint
- Backers receive unique, collectible tokens representing their support

### 🏆 Reward Tier System
- Automatic tier assignment based on contribution amount
- Exclusive rewards and perks for different backer levels

### ⏱️ Campaign Lifecycle
- Fixed 60-day campaign window
- Funds held in secure escrow wallet
- Transparent fund distribution mechanism

### 💡 Unique Funding Model
- **Campaign Target Mechanism**:
  - If target reached within 60 days: Funds transferred to creator's wallet
  - If target not reached: 100% of funds automatically refunded to backers

## 🛠 Technical Architecture

### Frontend
- React with TypeScript
- Tailwind CSS for responsive design
- Shadcn/UI component library

### Blockchain Integration
- Polkadot Asset Hub
- Ink! smart contracts (Rust-based)
- ERC-1155 Multi-token Standard

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Polkadot{.js} browser extension
- Rust & Substrate development tools

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/dotfund.git
cd dotfund

# Install dependencies
npm install

# Start development server
npm run dev
```

### Smart Contract Development
```bash
# Navigate to contracts directory
cd contracts

# Build contracts
cargo contract build

# Deploy to Polkadot Asset Hub
cargo contract upload --suri "your-seed-phrase"
```

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guidelines](CONTRIBUTING.md) for details on how to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for the Polkadot Ecosystem** 🌐
