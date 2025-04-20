
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Campaign } from "@/lib/types";
import { mockCampaigns } from "@/mock/campaigns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/context/WalletContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();

  useEffect(() => {
    if (id) {
      // In a real app, we would fetch the campaign from the blockchain
      const foundCampaign = mockCampaigns.find((camp) => camp.id === id);
      if (foundCampaign) {
        setCampaign(foundCampaign);
      } else {
        navigate("/not-found");
      }
    }
  }, [id, navigate]);

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading campaign...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const currentTier = campaign.rewardTiers.reduce((highest, tier) => {
    if (mintAmount >= tier.requiredAmount && tier.id > highest.id) {
      return tier;
    }
    return highest;
  }, { id: 0, name: 'No Tier', requiredAmount: 0, description: 'Mint more to qualify for rewards' });

  const handleMint = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would interact with the blockchain
      console.log(`Minting ${mintAmount} NFTs for campaign ${campaign.id}`);
      
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Update mock data
      const updatedCampaign = {
        ...campaign,
        raised: campaign.raised + mintAmount,
        backers: campaign.backers + 1,
      };
      setCampaign(updatedCampaign);
      
      alert(`Successfully minted ${mintAmount} NFTs!`);
    } catch (error) {
      console.error("Error minting:", error);
      alert("Failed to mint NFTs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-6 pb-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div>
              <div className="rounded-lg overflow-hidden border mb-6">
                <img
                  src={campaign.imageUrl}
                  alt={campaign.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="backers">Backers</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4">
                  <h2 className="text-2xl font-bold">About This Project</h2>
                  <p className="text-muted-foreground">{campaign.description}</p>
                  <p className="text-muted-foreground">
                    This is a demo of the DotFund platform. In a real implementation, this section would contain
                    detailed information about the project, including its goals, timeline, team members, and more.
                  </p>
                  <p className="text-muted-foreground">
                    The smart contract behind this platform would handle the minting of ERC-1155 NFTs,
                    track the total funds raised, enforce the 60-day campaign limit, and manage the reward tier system.
                  </p>
                </TabsContent>
                <TabsContent value="updates">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-bold">Campaign Launched!</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {format(campaign.startDate, "MMMM d, yyyy")}
                    </div>
                    <p>
                      We're excited to launch our campaign on DotFund! Thank you for your support and stay tuned
                      for more updates as we progress through our development milestones.
                    </p>
                  </div>
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No more updates yet</p>
                  </div>
                </TabsContent>
                <TabsContent value="backers">
                  <div className="text-center py-8 space-y-2">
                    <h3 className="text-xl font-bold">{campaign.backers} Backers</h3>
                    <p className="text-muted-foreground">
                      This project is supported by {campaign.backers} backers who believe in this vision.
                    </p>
                    <p className="text-sm">
                      In a full implementation, this section would list all backers and their contribution levels.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <div className="sticky top-20">
                <div className="rounded-lg border bg-card p-6 space-y-4">
                  <h1 className="text-2xl font-bold">{campaign.title}</h1>
                  <p className="text-muted-foreground">by {campaign.creator}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>{formattedRaised}</span>
                      <span>{formattedGoal} goal</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-md bg-muted">
                      <div className="font-bold">{progress}%</div>
                      <div className="text-xs text-muted-foreground">Funded</div>
                    </div>
                    <div className="p-2 rounded-md bg-muted">
                      <div className="font-bold">{campaign.backers}</div>
                      <div className="text-xs text-muted-foreground">Backers</div>
                    </div>
                    <div className="p-2 rounded-md bg-muted">
                      <div className="font-bold">{timeLeft.replace("in ", "")}</div>
                      <div className="text-xs text-muted-foreground">Left</div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Amount to Mint</span>
                        <span className="text-sm text-muted-foreground">$1 per NFT</span>
                      </div>
                      <div className="flex items-center border rounded-md">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="rounded-r-none h-10"
                          onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                          disabled={mintAmount <= 1}
                        >
                          -
                        </Button>
                        <div className="flex-1 text-center font-medium">{mintAmount}</div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="rounded-l-none h-10"
                          onClick={() => setMintAmount(mintAmount + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mb-2" size="lg">
                          Mint ({mintAmount} NFTs for ${mintAmount})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Confirm Minting</DialogTitle>
                          <DialogDescription>
                            You are about to mint {mintAmount} NFTs for ${mintAmount}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="bg-muted p-4 rounded-md">
                            <div className="font-medium mb-1">Your Selected Tier:</div>
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                {currentTier.id || "—"}
                              </div>
                              <div>
                                <div className="font-medium">{currentTier.name}</div>
                                <div className="text-xs text-muted-foreground">{currentTier.description}</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This transaction will mint {mintAmount} ERC-1155 NFTs on the Polkadot Asset Hub.
                            The NFTs represent your backing of this project.
                          </p>
                        </div>
                        <DialogFooter className="sm:justify-center">
                          <Button className="w-full" onClick={handleMint} disabled={loading}>
                            {loading ? "Processing..." : `Confirm and Mint (${mintAmount} NFTs)`}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-bold mb-4">Reward Tiers</h3>
                  <div className="space-y-3">
                    {campaign.rewardTiers.map((tier) => (
                      <div 
                        key={tier.id} 
                        className={`rounded-md border p-3 transition-colors ${
                          mintAmount >= tier.requiredAmount ? "border-primary/50 bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <div className={`h-6 w-6 rounded-full text-xs flex items-center justify-center font-bold
                            ${mintAmount >= tier.requiredAmount ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                          >
                            {tier.id}
                          </div>
                          <div className="font-medium">{tier.name}</div>
                          <div className="ml-auto text-sm">${tier.requiredAmount}+</div>
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CampaignDetails;
