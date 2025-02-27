import React, { createContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    username: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isRegistered: boolean; // הוספת המאפיין כאן
    setIsRegistered: (isRegistered: boolean) => void; // הוספת פונקציה לעדכון isRegistered
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(false); // הוספת מצב עבור isRegistered

    return (
        <UserContext.Provider value={{ user, setUser, isRegistered, setIsRegistered }}>
            {children}
        </UserContext.Provider>
    );
};
