import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { RewardTier } from "@/lib/types";
import { toast } from "@/components/ui/sonner";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    mediaType: "",
    goal: 10000,
    duration: 60,
  });
  
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([
    {
      id: 1,
      name: "Early Supporter",
      requiredAmount: 50,
      description: "Be among the first to support this project and get exclusive updates."
    },
    {
      id: 2,
      name: "Premium Backer",
      requiredAmount: 250,
      description: "Get early access to the product and special mention in the credits."
    },
    {
      id: 3,
      name: "Ultimate Supporter",
      requiredAmount: 1000,
      description: "Everything in previous tiers plus limited edition merchandise and private consultation."
    }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "goal" ? parseInt(value) || 0 : value,
    }));
  };

  const handleTierChange = (id: number, field: keyof RewardTier, value: string | number) => {
    setRewardTiers((prev) =>
      prev.map((tier) =>
        tier.id === id
          ? { ...tier, [field]: field === "requiredAmount" ? parseInt(value as string) || 0 : value }
          : tier
      )
    );
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      try {
        toast.info("Please connect your wallet to complete this action");
        await connectWallet();
        
        if (!isConnected) {
          return;
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        toast.error("Wallet connection required to create a campaign");
        return;
      }
    }
    
    setLoading(true);
    try {
      console.log("Creating campaign with data:", { ...formData, rewardTiers });
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      navigate("/campaign-success");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1024) {
        toast.error("File size should be less than 1GB");
        return;
      }

      const fileType = file.type.split('/')[0];
      if (fileType !== 'image' && fileType !== 'video') {
        toast.error("Please upload an image or video file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string,
          mediaType: fileType
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderMediaPreview = () => {
    if (!formData.imageUrl) return null;

    return (
      <div className="aspect-video rounded-md overflow-hidden border">
        {formData.mediaType === 'video' ? (
          <video
            src={formData.imageUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={formData.imageUrl}
            alt="Campaign preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Campaign</Label>
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="file"
                      id="imageUpload"
                      className="sr-only"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <label htmlFor="imageUpload" className="cursor-pointer">
                        <Upload className="mr-2" />
                        {formData.imageUrl ? "Replace Media" : "Upload Media"}
                      </label>
                    </Button>
                  </div>
                </div>

                {renderMediaPreview()}
              </div>
              
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title for your campaign"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, what you're building, and why people should support it"
                className="min-h-32"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleStepChange(2)}>Next: Funding Details</Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goal">Funding Goal (USD)</Label>
              <div className="flex items-center">
                <div className="mr-2 text-muted-foreground">$</div>
                <Input
                  id="goal"
                  name="goal"
                  type="number"
                  min="100"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                The minimum amount you need to raise for your campaign to be successful.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Campaign Duration</Label>
              <div className="flex items-center gap-2">
                <div className="bg-muted px-3 py-2 rounded-md">
                  <span className="font-medium">60 days</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All campaigns run for 60 days from the start date.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Your campaign will end on {format(addDays(new Date(), 60), "MMMM d, yyyy")}.
              </p>
            </div>
            
            <div className="flex gap-2 justify-between">
              <Button variant="outline" onClick={() => handleStepChange(1)}>
                Back
              </Button>
              <Button onClick={() => handleStepChange(3)}>Next: Reward Tiers</Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Reward Tiers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Define what backers will receive based on how many NFTs they mint.
                Each NFT costs $1, and backers are automatically assigned to tiers based on their contribution.
              </p>
              
              <div className="space-y-4">
                {rewardTiers.map((tier) => (
                  <Card key={tier.id}>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                          {tier.id}
                        </div>
                        <Input
                          value={tier.name}
                          onChange={(e) => handleTierChange(tier.id, "name", e.target.value)}
                          className="h-7 px-2 py-1"
                        />
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <span className="mr-1">Required amount: $</span>
                        <Input
                          type="number"
                          value={tier.requiredAmount}
                          onChange={(e) => handleTierChange(tier.id, "requiredAmount", e.target.value)}
                          className="w-20 h-7 px-2 py-1"
                          min="1"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <Textarea
                        value={tier.description}
                        onChange={(e) => handleTierChange(tier.id, "description", e.target.value)}
                        placeholder="Describe what backers will receive at this tier"
                        className="h-20 resize-none"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 justify-between">
              <Button variant="outline" onClick={() => handleStepChange(2)}>
                Back
              </Button>
              <Button onClick={() => handleStepChange(4)}>Next: Review & Submit</Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Campaign Review</h3>
              <p className="text-sm text-muted-foreground">
                Review your campaign details before submitting to the blockchain.
              </p>
              {!isConnected && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 my-4">
                  <p className="text-amber-800 font-medium">Wallet connection required</p>
                  <p className="text-sm text-amber-700">
                    You'll need to connect your Polkadot wallet before creating your campaign.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">{formData.title || "Untitled Campaign"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Description:</span>
                      <p className="mt-1">{formData.description || "No description provided."}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Funding Goal:</span>
                      <span className="font-medium">${formData.goal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">60 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span className="font-medium">
                        {format(addDays(new Date(), 60), "MMMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>Reward Tiers</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {rewardTiers.map((tier) => (
                    <div key={tier.id} className="p-3 border rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                          {tier.id}
                        </div>
                        <span className="font-medium">{tier.name}</span>
                        <span className="ml-auto text-sm">${tier.requiredAmount}+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Network:</span>
                      <span className="ml-2 font-medium">Polkadot Asset Hub</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NFT Standard:</span>
                      <span className="ml-2 font-medium">ERC-1155</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NFT Price:</span>
                      <span className="ml-2 font-medium">$1 per NFT</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your campaign will deploy a smart contract on the Polkadot Asset Hub that will handle
                      minting NFTs, tracking contributions, and distributing rewards.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex gap-2 justify-between">
              <Button variant="outline" onClick={() => handleStepChange(3)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading || (!isConnected && loading)}>
                {loading ? "Creating Campaign..." : !isConnected ? "Connect Wallet & Create" : "Create Campaign"}
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Create Your Campaign</h1>
            <p className="text-muted-foreground">
              Launch your project on Polkadot Asset Hub and start raising funds today.
            </p>
          </div>
          
          <div className="flex mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                <div
                  className={`flex-1 h-1 ${
                    step < 4 ? (currentStep > step ? "bg-primary" : "bg-muted") : "hidden"
                  }`}
                />
              </div>
            ))}
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStep()}
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCampaign;
