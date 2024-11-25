import React, { createContext, useContext, useState, ReactNode } from 'react';

type GroupContextType = {
    groupName: string;
    groupId: string;
    setGroupName: (name: string) => void;
    setGroupId: (id: string) => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [groupName, setGroupName] = useState<string>("");
    const [groupId, setGroupId] = useState<string>("");

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