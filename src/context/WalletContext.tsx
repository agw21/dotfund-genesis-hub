
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { web3Accounts, web3Enable, isWeb3Injected } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { toast } from '@/components/ui/sonner';

interface WalletContextType {
  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  selectAccount: (account: InjectedAccountWithMeta) => void;
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
  isExtensionAvailable: false,
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isExtensionAvailable, setIsExtensionAvailable] = useState(false);

  useEffect(() => {
    const checkExtension = async () => {
      const isAvailable = isWeb3Injected;
      console.log('Polkadot extension available:', isAvailable);
      setIsExtensionAvailable(isAvailable);
      
      if (isAvailable) {
        try {
          // Initialize extension without requesting access
          await web3Enable('DotFund');
        } catch (error) {
          console.error('Error initializing extension:', error);
        }
      }
    };
    
    checkExtension();
  }, []);

  const connectWallet = async (): Promise<void> => {
    try {
      console.log('Attempting to connect wallet');
      setIsConnecting(true);
      
      if (!isWeb3Injected) {
        console.error('No Polkadot.js extension found');
        toast.error('No Polkadot extension detected. Please install the Polkadot{.js} extension and create an account.');
        throw new Error('No extension installed');
      }
      
      // Check if Polkadot.js extension is available
      const extensions = await web3Enable('DotFund');
      console.log('Available extensions:', extensions);
      
      if (extensions.length === 0) {
        console.error('Extension found but not authorized');
        toast.error('Please authorize access to the Polkadot extension when prompted.');
        throw new Error('User did not approve the connection');
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
        isExtensionAvailable,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
