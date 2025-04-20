
export type CampaignStatus = 'active' | 'completed' | 'failed';

export interface RewardTier {
  id: number;
  name: string;
  requiredAmount: number;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  creator: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
  startDate: Date;
  endDate: Date;
  status: CampaignStatus;
  backers: number;
  rewardTiers: RewardTier[];
}
