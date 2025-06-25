import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ClientSideContext = createContext(null);

// Provider component
export const ClientSideProvider = ({ children }) => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // Detect client-side rendering
    setIsClientSide(true);
  }, []);

  return (
    <ClientSideContext.Provider value={{ isClientSide }}>
      {children}
    </ClientSideContext.Provider>
  );
};

// Custom hook for accessing the context
export const useClientSide = () => {
  const context = useContext(ClientSideContext);
  if (!context) {
    throw new Error('useClientSide must be used within a ClientSideProvider');
  }
  return context;
};

// Example usage of the context
export const ExampleComponent = () => {
  const { isClientSide } = useClientSide();

  return (
    <div>
      <h1>Rendering Mode</h1>
      <p>{isClientSide ? 'Client-side rendering' : 'Server-side rendering'}</p>
    </div>
  );
};