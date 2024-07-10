import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Deposit {
  total: number;
  bills: Record<number, number>;
}

interface DepositsContextProps {
  deposits: Deposit[];
  setDeposits: React.Dispatch<React.SetStateAction<Deposit[]>>;
}

const DepositsContext = createContext<DepositsContextProps | undefined>(undefined);

export const DepositsProvider = ({ children }: { children: ReactNode }) => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  return (
    <DepositsContext.Provider value={{ deposits, setDeposits }}>
      {children}
    </DepositsContext.Provider>
  );
};

export const useDeposits = () => {
  const context = useContext(DepositsContext);
  if (!context) {
    throw new Error('useDeposits must be used within a DepositsProvider');
  }
  return context;
};
