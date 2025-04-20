
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">D</span>
            </div>
            <span className="font-bold text-xl">DotFund</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Decentralized crowdfunding on Polkadot's Asset Hub. <br />
            Built with ❤️ for the Polkadot ecosystem.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-6">
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground md:text-right">
            © {new Date().getFullYear()} DotFund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
