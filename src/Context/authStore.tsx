// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from './Types/User';

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>,
    isLoggedIn: boolean;
    login: (username: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string) => {
        setUser({ email: username });
    };

    const logout = () => {
        setUser(null);
    };

    // const handleRegister = async (email: string, password: string) => {
    //     const user = await registerUser("testuser", "123456");
    //     if (user) {
    //         console.log("Registered:", user);
    //     }
    // };
    // const handleLogin = async () => {
    //     const result = await loginUser("testuser", "123456");
    //     if (result) {
    //         console.log("Logged in:", result.username, result.token);
    //     }
    // };

    // const isLoggedIn = !!user;
    const isLoggedIn = true;

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
