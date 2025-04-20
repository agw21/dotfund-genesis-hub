
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface CampaignCardProps {
  campaign: Campaign;
  onView: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onView }) => {
  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  const timeLeft = formatDistanceToNow(new Date(campaign.endDate), { addSuffix: true });
  
  const formattedRaised = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(campaign.raised);
  
  const formattedGoal = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(campaign.goal);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.title} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="px-4 py-3 pb-1">
        <CardTitle className="line-clamp-1 text-lg">{campaign.title}</CardTitle>
        <CardDescription className="line-clamp-1">by {campaign.creator}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="mb-2">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-bold">{formattedRaised}</p>
            <p className="text-muted-foreground text-xs">of {formattedGoal}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{campaign.backers}</p>
            <p className="text-muted-foreground text-xs">backers</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{timeLeft}</p>
            <p className="text-muted-foreground text-xs">remaining</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 pt-0">
        <Button onClick={() => onView(campaign)} className="w-full" variant="secondary">
          View Campaign
        </Button>
      </CardFooter>
    </Card>
  );
};
