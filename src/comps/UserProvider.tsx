// UserProvider.tsx
import React, { createContext, useState, ReactNode } from 'react';

// הגדרת ממשק User
interface User {
    id: number;
    username: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isRegistered: boolean;
    setIsRegistered: (isRegistered: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ user, setUser, isRegistered, setIsRegistered }}>
            {children}
        </UserContext.Provider>
    );
};
