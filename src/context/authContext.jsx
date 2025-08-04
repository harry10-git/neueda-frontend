import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:3001/api/login/', inputs);
        setUser(res.data);
    };

    const logout = async (inputs) => {
    await axios.post("http://localhost:3001/api/logout/");
    setUser(null);
  };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};