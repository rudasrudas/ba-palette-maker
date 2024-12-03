'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const ConsentContext = createContext();

export const ConsentProvider = ({ children }) => {
  const [hasConsent, setHasConsent] = useState(undefined);

  useEffect(() => {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('userConsent='));
    const consent = cookies ? cookies.split('=')[1] : null;
    setHasConsent(consent === 'true');
  }, []);

  const updateConsent = (consent) => {
    document.cookie = `userConsent=${consent}; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Strict`;
    setHasConsent(consent === 'true');
  };

  return (
    <ConsentContext.Provider value={{ hasConsent, updateConsent }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);