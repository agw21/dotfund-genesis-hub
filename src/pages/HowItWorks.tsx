
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">How DotFund Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our decentralized crowdfunding platform uses blockchain technology and NFTs to create a seamless experience for creators and backers.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* For Creators Section */}
            <section>
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b">For Project Creators</h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-primary w-8 h-8 rounded-full text-primary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Create Your Campaign</h3>
                    <p className="text-muted-foreground mb-4">
                      Set up your project with details, funding goals, and reward tiers. Your campaign will be deployed as a smart contract on the Polkadot Asset Hub.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Define your funding goal and project details</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Create reward tiers for backers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Launch as a smart contract on Polkadot Asset Hub</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <div className="bg-background rounded-md p-6 border">
                      <h4 className="font-medium mb-2">Technical Details</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        When you create a campaign, an Ink! smart contract is deployed to the Polkadot Asset Hub with the following parameters:
                      </p>
                      <div className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                        <pre>
{`#[ink::contract]
mod dotfund_campaign {
    #[ink(storage)]
    pub struct Campaign {
        creator: AccountId,
        title: String,
        description: String,
        goal: Balance,
        raised: Balance,
        start_timestamp: Timestamp,
        end_timestamp: Timestamp,
        backers: Vec<AccountId>,
        reward_tiers: Vec<RewardTier>,
    }`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-1 md:order-2">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-primary w-8 h-8 rounded-full text-primary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Collect Funds</h3>
                    <p className="text-muted-foreground mb-4">
                      As backers support your project by minting NFTs, funds are securely held by the smart contract. Each NFT is priced at $1, making it accessible for all backers.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Backers mint NFTs at $1 each</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Campaign progress is tracked transparently on-chain</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>60-day campaign window with real-time updates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-2 md:order-1 bg-muted/50 p-6 rounded-lg border">
                    <div className="bg-background rounded-md p-6 border">
                      <h4 className="font-medium mb-2">Smart Contract Implementation</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        The minting function creates ERC-1155 tokens and tracks contributions:
                      </p>
                      <div className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                        <pre>
{`#[ink(message, payable)]
pub fn mint(&mut self, amount: u64) -> Result<(), Error> {
    // Check if campaign is active
    self.ensure_campaign_active()?;
    
    // Calculate contribution value
    let value = self.env().transferred_value();
    
    // Mint NFTs
    self.token_count += amount;
    self.raised += value;
    
    // Determine reward tier
    let tier = self.get_reward_tier(value);
    self.backers.push((self.env().caller(), value, tier));
    
    // Emit event
    self.env().emit_event(Contributed {
        account: self.env().caller(),
        amount: value,
        tier,
    });
    
    Ok(())
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-primary w-8 h-8 rounded-full text-primary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Distribute Rewards</h3>
                    <p className="text-muted-foreground mb-4">
                      After your campaign ends successfully, reward NFTs are automatically airdropped to backers based on their tier. You receive the funds to deliver on your promises.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Automatic reward NFT airdrops based on contribution tiers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Funds are released to creator if goal is reached</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Transparent delivery tracking through blockchain</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <div className="bg-background rounded-md p-6 border">
                      <h4 className="font-medium mb-2">Campaign Finalization</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        When the campaign ends, the smart contract automatically processes the outcome:
                      </p>
                      <div className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                        <pre>
{`#[ink(message)]
pub fn finalize_campaign(&mut self) -> Result<(), Error> {
    // Ensure campaign has ended
    if self.env().block_timestamp() < self.end_timestamp {
        return Err(Error::CampaignStillActive);
    }
    
    // Check if goal was reached
    if self.raised >= self.goal {
        // Success: Transfer funds to creator
        self.env().transfer(self.creator, self.raised)
            .map_err(|_| Error::TransferFailed)?;
            
        // Airdrop reward NFTs to backers
        for (backer, amount, tier) in &self.backers {
            self.reward_nfts.mint_to(
                *backer, 
                tier.id, 
                1, // One NFT per tier
                Vec::new()
            );
        }
        
        self.status = CampaignStatus::Completed;
    } else {
        // Failure: Allow refunds
        self.status = CampaignStatus::Failed;
    }
    
    Ok(())
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* For Backers Section */}
            <section>
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b">For Backers</h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-secondary w-8 h-8 rounded-full text-secondary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Discover Projects</h3>
                    <p className="text-muted-foreground mb-4">
                      Browse through innovative projects on the Polkadot ecosystem. Each project displays its funding goal, timeline, and unique reward tiers.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Explore campaigns across different categories</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>View transparent funding progress</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Evaluate project details and team credentials</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative max-w-xs">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl" />
                      <div className="relative rounded-xl overflow-hidden border shadow-xl">
                        <img
                          src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg"
                          alt="Discovering projects"
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-1 md:order-2">
                    <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-secondary w-8 h-8 rounded-full text-secondary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Back Projects</h3>
                    <p className="text-muted-foreground mb-4">
                      Support projects by minting NFTs priced at $1 each. The more you mint, the higher your reward tier, unlocking better perks and benefits.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Mint NFTs at $1 each to support projects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Automatically qualify for reward tiers based on amount</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Track your contributions in your dashboard</span>
                      </li>
                    </ul>
                  </div>
                  <div className="order-2 md:order-1 flex justify-center">
                    <div className="relative max-w-xs">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl" />
                      <div className="relative rounded-xl overflow-hidden border shadow-xl">
                        <img
                          src="https://images.pexels.com/photos/7876061/pexels-photo-7876061.jpeg"
                          alt="Supporting projects"
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <div className="bg-secondary w-8 h-8 rounded-full text-secondary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Receive Rewards</h3>
                    <p className="text-muted-foreground mb-4">
                      After a successful campaign ends, you'll automatically receive your reward NFTs. These act as proof to claim your products once they're ready.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Receive tier-based reward NFTs after campaign completion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Use NFTs to claim physical or digital products</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>Keep collectible NFTs as proof of backing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative max-w-xs">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-3xl" />
                      <div className="relative rounded-xl overflow-hidden border shadow-xl">
                        <img
                          src="https://images.pexels.com/photos/8370784/pexels-photo-8370784.jpeg"
                          alt="Receiving rewards"
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Technical Details */}
            <section>
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b">Technical Implementation</h2>
              <div className="prose max-w-none">
                <p>
                  DotFund is built on the Polkadot Asset Hub using Ink! smart contracts to ensure secure, transparent, and efficient crowdfunding operations. 
                  Here's a brief overview of our technical implementation:
                </p>
                
                <h3>Smart Contract Architecture</h3>
                <ul>
                  <li><strong>Campaign Factory Contract:</strong> Creates and manages individual campaign contracts</li>
                  <li><strong>Campaign Contract:</strong> Handles minting, funding tracking, and reward distribution</li>
                  <li><strong>NFT Implementation:</strong> Based on ERC-1155 standard for efficient multi-token transfers</li>
                </ul>
                
                <h3>Key Features</h3>
                <ul>
                  <li><strong>On-demand Minting:</strong> NFTs are created when backers support projects</li>
                  <li><strong>Time-locked Campaigns:</strong> 60-day limit enforced by blockchain timestamps</li>
                  <li><strong>Automatic Tier Assignment:</strong> Smart contracts track contribution amounts</li>
                  <li><strong>Trustless Execution:</strong> All processes execute automatically based on predefined conditions</li>
                </ul>
                
                <h3>Security Measures</h3>
                <ul>
                  <li>All contracts are audited by independent security firms</li>
                  <li>Funds are held in time-locked escrow until campaign completion</li>
                  <li>Full transparency with all actions recorded on-chain</li>
                </ul>
                
                <p>
                  DotFund is fully open source, with all code available on GitHub for review and contribution.
                  Our goal is to build a transparent, secure platform that serves both creators and backers.
                </p>
              </div>
            </section>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you want to launch your own campaign or support innovative projects,
              DotFund makes blockchain crowdfunding accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/create">Create a Campaign</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/">Explore Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
