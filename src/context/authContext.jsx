import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:3001/api/login/', inputs);
        setUser(res.data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};