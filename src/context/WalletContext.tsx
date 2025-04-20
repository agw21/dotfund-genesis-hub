
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

// Create dummy accounts for testing
const DUMMY_ACCOUNTS = [
  {
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    meta: {
      name: 'Alice',
      source: 'dummy'
    }
  },
  {
    address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    meta: {
      name: 'Bob',
      source: 'dummy'
    }
  }
];

interface WalletContextType {
  accounts: typeof DUMMY_ACCOUNTS;
  selectedAccount: (typeof DUMMY_ACCOUNTS)[number] | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  selectAccount: (account: (typeof DUMMY_ACCOUNTS)[number]) => void;
  isConnected: boolean;
  isExtensionAvailable: boolean;
}

const defaultContext: WalletContextType = {
  accounts: [],
  selectedAccount: null,
  isConnecting: false,
  connectWallet: async () => {},
  selectAccount: () => {},
  isConnected: false,
  isExtensionAvailable: true, // Always true for dummy version
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<typeof DUMMY_ACCOUNTS>([]);
  const [selectedAccount, setSelectedAccount] = useState<(typeof DUMMY_ACCOUNTS)[number] | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccounts(DUMMY_ACCOUNTS);
      setSelectedAccount(DUMMY_ACCOUNTS[0]);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const selectAccount = (account: (typeof DUMMY_ACCOUNTS)[number]) => {
    setSelectedAccount(account);
    toast.success(`Switched to account: ${account.meta.name}`);
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
        isExtensionAvailable: true, // Always true for dummy version
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
