import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/ui/card-campaign";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Campaign } from "@/lib/types";
import { mockCampaigns } from "@/mock/campaigns";

const Index = () => {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const navigate = useNavigate();

  const handleViewCampaign = (campaign: Campaign) => {
    navigate(`/campaign/${campaign.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Fund Your Project with DotFund
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DotFund makes blockchain crowdfunding accessible to everyone. Launch your crowdfund and build a community while raising funds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="px-8" onClick={() => navigate("/create")}>
                    Start a Campaign
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/how-it-works")}>
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl" />
                  <div className="relative bg-background rounded-xl overflow-hidden border shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9"
                      alt="Smartwatch"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Campaigns */}
        <section className="py-12 px-4 md:py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Campaigns</h2>
                <p className="text-muted-foreground">Discover innovative projects on the Polkadot ecosystem</p>
              </div>
              <Button variant="outline" onClick={() => navigate("/campaigns")}>
                View All Campaigns
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onView={handleViewCampaign}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-12 px-4 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">How DotFund Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our blockchain-powered crowdfunding platform uses NFTs to create a seamless experience for creators and backers, with secure escrow functionality
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Campaign</h3>
                <p className="text-muted-foreground">
                  Set your funding goal, campaign duration, and define your reward tiers for backers. All campaigns run for 60 days.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-secondary/10 p-3 rounded-full mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Funding Process</h3>
                <p className="text-muted-foreground">
                  Backers mint NFTs at $1 each, with funds held securely in an escrow wallet until the campaign ends. This ensures safe transactions for everyone.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Campaign Resolution</h3>
                <p className="text-muted-foreground">
                  After 60 days, if the target is reached, funds are transferred to the creator. If not reached, all funds are automatically refunded to backers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 px-4 md:py-24">
          <div className="container">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-1">
              <div className="bg-background rounded-xl p-6 md:p-12 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">Ready to Launch Your Campaign?</h2>
                <p className="text-muted-foreground max-w-2xl mb-6">
                  Join the future of crowdfunding today and connect with backers who share your vision.
                </p>
                <Button size="lg" onClick={() => navigate("/create")}>
                  Start a Campaign
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
