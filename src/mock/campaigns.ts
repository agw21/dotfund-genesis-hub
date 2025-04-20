
import { Campaign } from '@/lib/types';
import { addDays } from 'date-fns';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Polkadot NFT Marketplace',
    creator: 'Alice',
    description: 'Building a next-gen NFT marketplace specifically for the Polkadot ecosystem, enabling artists and collectors to trade digital assets with minimal fees and cross-chain compatibility.',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    goal: 50000,
    raised: 35000,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    endDate: addDays(new Date(), 45),
    status: 'active',
    backers: 721,
    rewardTiers: [
      {
        id: 1,
        name: 'Early Bird',
        requiredAmount: 50,
        description: 'Early access to the marketplace and a limited edition NFT'
      },
      {
        id: 2,
        name: 'Collector',
        requiredAmount: 250,
        description: 'All previous rewards + 5 exclusive NFTs and premium account status'
      },
      {
        id: 3,
        name: 'Founding Member',
        requiredAmount: 1000,
        description: 'All previous rewards + lifetime no-fee trading and governance rights'
      }
    ]
  },
  {
    id: '2',
    title: 'DeFi Aggregator for Polkadot',
    creator: 'Bob',
    description: 'Creating a DeFi dashboard that aggregates all Polkadot parachains and allows users to manage their assets, stake, and participate in DeFi across the entire ecosystem from one interface.',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg',
    goal: 75000,
    raised: 60000,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    endDate: addDays(new Date(), 30),
    status: 'active',
    backers: 542,
    rewardTiers: [
      {
        id: 1,
        name: 'Beta Tester',
        requiredAmount: 100,
        description: 'Early beta access and a branded hardware wallet'
      },
      {
        id: 2,
        name: 'Power User',
        requiredAmount: 500,
        description: 'All previous rewards + premium features unlocked for 1 year'
      },
      {
        id: 3,
        name: 'Whale Status',
        requiredAmount: 2000,
        description: 'All previous rewards + lifetime premium access and quarterly strategy calls'
      }
    ]
  },
  {
    id: '3',
    title: 'Cross-Chain Identity Solution',
    creator: 'Charlie',
    description: 'Developing a universal identity solution that works across Polkadot, Ethereum, and other major blockchains, allowing users to maintain a consistent identity and reputation across the entire Web3 ecosystem.',
    imageUrl: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg',
    goal: 120000,
    raised: 48000,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
    endDate: addDays(new Date(), 40),
    status: 'active',
    backers: 384,
    rewardTiers: [
      {
        id: 1,
        name: 'Identity Pioneer',
        requiredAmount: 75,
        description: 'Early access to the identity platform and a verified profile badge'
      },
      {
        id: 2,
        name: 'Identity Ambassador',
        requiredAmount: 350,
        description: 'All previous rewards + custom identity features and enhanced security options'
      },
      {
        id: 3,
        name: 'Identity Whale',
        requiredAmount: 1500,
        description: 'All previous rewards + lifetime enterprise subscription and DAO governance rights'
      }
    ]
  },
  {
    id: '4',
    title: 'Substrate Developer Academy',
    creator: 'Dave',
    description: 'Creating a comprehensive learning platform for Substrate, Polkadot\'s blockchain framework, with courses for beginners to advanced developers, live mentoring, and hands-on projects.',
    imageUrl: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg',
    goal: 90000,
    raised: 22500,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    endDate: addDays(new Date(), 50),
    status: 'active',
    backers: 217,
    rewardTiers: [
      {
        id: 1,
        name: 'Student',
        requiredAmount: 120,
        description: 'Full access to all courses and learning materials for 1 year'
      },
      {
        id: 2,
        name: 'Developer',
        requiredAmount: 500,
        description: 'All previous rewards + mentoring sessions and project reviews'
      },
      {
        id: 3,
        name: 'Blockchain Expert',
        requiredAmount: 2500,
        description: 'All previous rewards + certification, job placement, and lifetime updates'
      }
    ]
  },
];
