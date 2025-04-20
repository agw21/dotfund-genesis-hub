
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";

export const Header: React.FC = () => {
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-bold text-xl">DotFund</span>
          </Link>
          <nav className="hidden md:flex gap-4 ml-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Discover
            </Link>
            <Link to="/create" className="text-muted-foreground hover:text-foreground">
              Start a Campaign
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/create">
            <Button variant="outline" className="hidden md:flex">
              Create Campaign
            </Button>
          </Link>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};
