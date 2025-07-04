'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PortfolioVisitContextType {
  hasVisitedPortfolio: boolean;
  setHasVisitedPortfolio: (value: boolean) => void;
}

const PortfolioVisitContext = createContext<PortfolioVisitContextType>({
  hasVisitedPortfolio: false,
  setHasVisitedPortfolio: () => {},
});

export const usePortfolioVisit = () => useContext(PortfolioVisitContext);

export const PortfolioVisitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasVisitedPortfolio, setHasVisitedPortfolio] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 在组件挂载时标记为客户端环境
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 在客户端环境中，从localStorage读取状态
  useEffect(() => {
    if (isClient) {
      try {
        const visited = localStorage.getItem('hasVisitedPortfolio');
        if (visited === 'true') {
          setHasVisitedPortfolio(true);
        }
      } catch (error) {
        console.error('无法从本地存储读取数据', error);
      }
    }
  }, [isClient]);

  // 当状态变化时更新本地存储（仅在客户端）
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('hasVisitedPortfolio', hasVisitedPortfolio.toString());
      } catch (error) {
        console.error('无法将数据写入本地存储', error);
      }
    }
  }, [hasVisitedPortfolio, isClient]);

  return (
    <PortfolioVisitContext.Provider value={{ hasVisitedPortfolio, setHasVisitedPortfolio }}>
      {children}
    </PortfolioVisitContext.Provider>
  );
}; 