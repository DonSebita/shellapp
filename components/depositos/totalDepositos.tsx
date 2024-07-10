import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TotalDepositsContextProps {
  totalDepositos: number;
  setTotalDepositos: React.Dispatch<React.SetStateAction<number>>;
}

const TotalDepositsContext = createContext<TotalDepositsContextProps | undefined>(undefined);

export const TotalDepositsProvider = ({ children }: { children: ReactNode }) => {
  const [totalDepositos, setTotalDepositos] = useState<number>(0);

  return (
    <TotalDepositsContext.Provider value={{ totalDepositos, setTotalDepositos }}>
      {children}
    </TotalDepositsContext.Provider>
  );
};

export const useTotalDeposits = () => {
  const context = useContext(TotalDepositsContext);
  if (!context) {
    throw new Error('useTotalDeposits must be used within a TotalDepositsProvider');
  }
  return context;
};
