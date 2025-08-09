import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUser } from "../localStorage/userStorage";

interface User {
    id: number;
    email: string;
    role: string;
    name: string;
    client_id: number;
}

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(getUser());

    useEffect(() => {

        const handleStorageChange = () => {
            setUser(getUser());
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const login = (userData: User) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )

}