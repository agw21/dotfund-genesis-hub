
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check } from "lucide-react";

const CampaignSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-2xl text-center px-4">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Campaign Created Successfully!</h1>
          <p className="text-xl mb-8">
            Your campaign has been deployed to the Polkadot Asset Hub and is now live.
          </p>
          
          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="font-medium mb-2">What happens next?</h2>
            <ul className="text-left space-y-2 mb-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>Share your campaign with your network to start getting backers.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>Post regular updates to keep your backers informed about your progress.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>If your campaign reaches its goal, you'll receive the funds automatically.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>Reward NFTs will be automatically airdropped to backers after the campaign ends.</span>
              </li>
            </ul>
            
            <div className="text-sm text-muted-foreground">
              <p>
                Your campaign contract address: <span className="font-mono">0x1234...5678</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">View All Campaigns</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link to="/dashboard">Go to Your Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CampaignSuccess;
