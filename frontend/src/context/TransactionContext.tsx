import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type TransactionContextType = {
    transactionId: string;
    setTransactionId: (id: string) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [transactionId, setTransactionId] = useState<string>(() => {
        // Initialize state from localStorage
        return localStorage.getItem('transactionId') || "";
    });
    useEffect(() => {
        // Save groupName to localStorage whenever it changes
        localStorage.setItem('transactionId', transactionId);
    }, [transactionId]);

    return (
        <TransactionContext.Provider value={{ transactionId, setTransactionId }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error("useTransaction must be used within a TransactionProvider");
    }
    return context;
}; 