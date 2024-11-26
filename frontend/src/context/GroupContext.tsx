import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type GroupContextType = {
    groupName: string;
    groupId: string;
    setGroupName: (name: string) => void;
    setGroupId: (id: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [groupName, setGroupName] = useState<string>(() => {
        // Initialize state from localStorage
        return localStorage.getItem('groupName') || "";
    });
    useEffect(() => {
        // Save groupName to localStorage whenever it changes
        localStorage.setItem('groupName', groupName);
    }, [groupName]);
    const [groupId, setGroupId] = useState<string>(() => {
        // Initialize state from localStorage
        return localStorage.getItem('groupId') || "";
    });
    useEffect(() => {
        // Save groupId to localStorage whenever it changes
        localStorage.setItem('groupId', groupId);
    }, [groupId]);      

    return (
        <GroupContext.Provider value={{ groupName, groupId, setGroupName, setGroupId }}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroup = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error("useGroup must be used within a GroupProvider");
    }
    return context;
}; 