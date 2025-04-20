
# DotFund - Web3 Crowdfunding Platform on Polkadot Asset Hub

DotFund allows creators to raise funds by minting their products as open edition ERC-1155 NFTs, priced at $1 per mint. Backers can mint these NFTs during a 60-day campaign window and are automatically assigned reward tiers based on their contribution.

## Features

- **Open Edition NFT Campaigns**: Creators launch campaigns by minting NFTs priced at $1 each
- **Automatic Tier Assignment**: Backers are assigned to reward tiers based on contribution amount
- **60-Day Campaign Window**: All campaigns run for a fixed 60-day period
- **Reward NFT Airdrops**: Successful campaigns trigger automatic NFT airdrops to backers
- **Goal-Based Claiming**: Product claiming only allowed if funding goal is reached

## Technical Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Blockchain**: Polkadot Asset Hub
- **Smart Contracts**: Ink! (Rust-based smart contract language for Substrate)
- **Token Standard**: ERC-1155 (Multi-token standard)

## Smart Contract Implementation

The platform consists of two primary smart contracts:

1. **Campaign Factory Contract**: Creates and manages individual campaign contracts
2. **Campaign Contract**: Handles the core functionality for each campaign:
   - Minting NFTs
   - Tracking contributions
   - Assigning reward tiers
   - Distributing reward NFTs
   - Managing campaign lifecycle

### Key Contract Functions

```rust
// Campaign creation
fn create_campaign(
    creator: AccountId,
    title: String,
    description: String,
    goal: Balance,
    reward_tiers: Vec<RewardTier>
) -> Result<AccountId, Error>;

// NFT minting
fn mint(amount: u64) -> Result<(), Error>;

// Campaign finalization
fn finalize_campaign() -> Result<(), Error>;

// Reward claiming
fn claim_rewards() -> Result<(), Error>;
```

## Getting Started

### Prerequisites

- Node.js and npm
- Polkadot{.js} browser extension
- Ink! development tools (for smart contract development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dotfund.git
cd dotfund
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Smart Contract Development

1. Install the Substrate/Ink! development environment
2. Navigate to the contracts directory:
```bash
cd contracts
```

3. Build the contracts:
```bash
cargo contract build
```

4. Deploy to the Polkadot Asset Hub (requires proper account setup):
```bash
cargo contract upload --suri "your-seed-phrase"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
