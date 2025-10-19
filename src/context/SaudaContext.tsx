
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a Sauda object
export interface Sauda {
  crop: string;
  buyerName: string;
  buyerContact: string;
  quantity: number;
  pricePerQuintal: number;
  deliveryLocation: string;
  sowingDate: string; // Storing dates as ISO strings for serialization
  expectedHarvestDate: string;
}

// Define the shape of the context
interface SaudaContextType {
  saudas: Sauda[];
  addSauda: (sauda: Sauda) => void;
}

// Create the context with a default value of undefined
export const SaudaContext = createContext<SaudaContextType | undefined>(undefined);

// Create a provider component
export const SaudaProvider = ({ children }: { children: ReactNode }) => {
  const [saudas, setSaudas] = useState<Sauda[]>([]);

  // Load saudas from localStorage on initial render
  useEffect(() => {
    try {
      const storedSaudas = localStorage.getItem('saudas');
      if (storedSaudas) {
        setSaudas(JSON.parse(storedSaudas));
      }
    } catch (error) {
      console.error("Failed to parse saudas from localStorage", error);
    }
  }, []);

  // Save saudas to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('saudas', JSON.stringify(saudas));
    } catch (error) {
        console.error("Failed to save saudas to localStorage", error);
    }
  }, [saudas]);

  const addSauda = (sauda: Sauda) => {
    setSaudas(prevSaudas => [...prevSaudas, sauda]);
  };

  return (
    <SaudaContext.Provider value={{ saudas, addSauda }}>
      {children}
    </SaudaContext.Provider>
  );
};
