
import { Campaign } from '@/lib/types';
import { addDays, subDays } from 'date-fns';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'EcoWatch: Solar-Powered Smart Watch',
    creator: 'TechWear Labs',
    description: 'A revolutionary smart watch powered by solar energy, featuring a high-resolution display, fitness tracking, and a sleek, sustainable design. Never worry about charging your watch again.',
    imageUrl: 'https://images.pexels.com/photos/434346/pexels-photo-434346.jpeg',
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
        description: 'Get the EcoWatch at a special early bird price'
      },
      {
        id: 2,
        name: 'Premium Package',
        requiredAmount: 250,
        description: 'EcoWatch + premium leather strap and charging dock'
      },
      {
        id: 3,
        name: 'Collector Edition',
        requiredAmount: 1000,
        description: 'Limited edition titanium EcoWatch + all accessories + lifetime warranty'
      }
    ]
  },
  {
    id: '2',
    title: 'ArtMaster Pro Drawing Tablet',
    creator: 'Creative Tools Co',
    description: 'Professional-grade drawing tablet with 4K resolution, tilt support, and pressure sensitivity. Project successfully funded and all rewards delivered to backers.',
    imageUrl: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg',
    goal: 75000,
    raised: 82000,
    startDate: subDays(new Date(), 90),
    endDate: subDays(new Date(), 30),
    status: 'completed',
    backers: 942,
    rewardTiers: [
      {
        id: 1,
        name: 'Standard Edition',
        requiredAmount: 100,
        description: 'ArtMaster Pro tablet + standard stylus'
      },
      {
        id: 2,
        name: 'Artist Bundle',
        requiredAmount: 500,
        description: 'ArtMaster Pro + premium stylus + carrying case + 1-year creative software subscription'
      },
      {
        id: 3,
        name: 'Studio Package',
        requiredAmount: 2000,
        description: 'Two ArtMaster Pro tablets + all accessories + lifetime software subscription'
      }
    ]
  },
  {
    id: '3',
    title: 'UrbanFlex Sneakers',
    creator: 'Street Style Collective',
    description: 'Revolutionary sneakers with adaptable soles that conform to your feet. Campaign did not reach funding goal within the timeframe.',
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    goal: 120000,
    raised: 48000,
    startDate: subDays(new Date(), 70),
    endDate: subDays(new Date(), 10),
    status: 'failed',
    backers: 384,
    rewardTiers: [
      {
        id: 1,
        name: 'Classic Edition',
        requiredAmount: 75,
        description: 'One pair of UrbanFlex sneakers in your choice of color'
      },
      {
        id: 2,
        name: 'Customized Pack',
        requiredAmount: 350,
        description: 'Two pairs of fully customizable UrbanFlex sneakers + exclusive colorways'
      },
      {
        id: 3,
        name: 'Collector Set',
        requiredAmount: 1500,
        description: 'Limited edition set of four UrbanFlex sneakers + custom display case'
      }
    ]
  },
  {
    id: '4',
    title: 'Artisan Canvas Backpack',
    creator: 'Heritage Craft Co',
    description: 'Handcrafted premium canvas backpack with leather trim. Features water-resistant coating and hidden anti-theft pockets.',
    imageUrl: 'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg',
    goal: 90000,
    raised: 22500,
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    endDate: addDays(new Date(), 50),
    status: 'active',
    backers: 217,
    rewardTiers: [
      {
        id: 1,
        name: 'Classic Pack',
        requiredAmount: 120,
        description: 'Artisan Canvas Backpack in your choice of color'
      },
      {
        id: 2,
        name: 'Travel Set',
        requiredAmount: 500,
        description: 'Backpack + matching duffle bag + leather accessories'
      },
      {
        id: 3,
        name: 'Premium Collection',
        requiredAmount: 2500,
        description: 'Full collection of bags and accessories in limited edition leather'
      }
    ]
  },
];
