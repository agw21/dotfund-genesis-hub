
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { toast } from '@/components/ui/sonner';

interface WalletContextType {
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  selectAccount: (account: InjectedAccountWithMeta) => void;
  isConnected: boolean;
}

const defaultContext: WalletContextType = {
  accounts: [],
  selectedAccount: null,
  isConnecting: false,
  connectWallet: async () => {},
  selectAccount: () => {},
  isConnected: false,
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async (): Promise<void> => {
    try {
      console.log('Attempting to connect wallet');
      setIsConnecting(true);
      
      // Check if Polkadot.js extension is available
      const extensions = await web3Enable('DotFund');
      console.log('Available extensions:', extensions);
      
      if (extensions.length === 0) {
        console.error('No Polkadot.js extension found');
        toast.error('No Polkadot extension found. Please install the Polkadot{.js} extension and create an account.');
        throw new Error('No extension installed, or user did not approve the connection');
      }
      
      const allAccounts = await web3Accounts();
      console.log('Discovered accounts:', allAccounts);
      
      if (allAccounts.length === 0) {
        toast.error('No accounts found in your Polkadot wallet. Please create an account first.');
        throw new Error('No accounts found in wallet');
      }
      
      setAccounts(allAccounts);
      
      if (allAccounts.length > 0) {
        setSelectedAccount(allAccounts[0]);
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      console.error('Detailed wallet connection error:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const selectAccount = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
  };

  return (
    <WalletContext.Provider
      value={{
        accounts,
        selectedAccount,
        isConnecting,
        connectWallet,
        selectAccount,
        isConnected: !!selectedAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
