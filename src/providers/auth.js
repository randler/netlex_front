import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const setTokenLogged = (token) => {
        setToken(token);
    }

    const setUserLogged = (user) => {
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{user, setUserLogged, token, setTokenLogged}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);