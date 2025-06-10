import React, { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({ children, value, onValueChange }: { 
  children: React.ReactNode; 
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex border-b border-gray-200 w-full ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className = '' }: { 
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors relative
        ${isActive 
          ? 'text-primary-600 border-b-2 border-primary-600' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
        ${className}`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }: { 
  children: React.ReactNode;
  value: string;
}) {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  
  return context.value === value ? <div>{children}</div> : null;
}