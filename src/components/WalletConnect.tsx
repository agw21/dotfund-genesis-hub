
import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, User } from 'lucide-react';

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const WalletConnect: React.FC = () => {
  const { isConnected, isConnecting, connectWallet, selectedAccount, accounts, selectAccount } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  if (isConnected && selectedAccount) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-primary/20 bg-primary/10">
            <User className="mr-2" />
            {shortenAddress(selectedAccount.address)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Connected Account</h4>
            {accounts.map((account) => (
              <div
                key={account.address}
                className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                  selectedAccount.address === account.address ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
                onClick={() => selectAccount(account)}
              >
                <div className="truncate flex-1">
                  <div className="font-medium">{account.meta.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {account.address}
                  </div>
                </div>
                {selectedAccount.address === account.address && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};
