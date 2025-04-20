
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

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
      setIsConnecting(true);
      const extensions = await web3Enable('DotFund');
      
      if (extensions.length === 0) {
        throw new Error('No extension installed, or user did not approve the connection');
      }
      
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);
      
      if (allAccounts.length > 0) {
        setSelectedAccount(allAccounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
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
