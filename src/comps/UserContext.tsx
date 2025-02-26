import React, { createContext, useState } from 'react';

interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    tz: string;
}
interface UserContextType {
    user: User | null; // או whatever type you're using
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
