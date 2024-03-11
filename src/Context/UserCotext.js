import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export let UserContext = createContext();

export function UserCotextProvider({ children }) {
    let [userToken, setUserToken] = useState(null);
    let [userData, setUserData] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            let data = jwtDecode(localStorage.getItem("userToken"));
            setUserData(data);
        }
    }, [userToken]);
    return (
        <UserContext.Provider value={{ userToken, setUserToken, userData }}>
            {children}
        </UserContext.Provider>
    );
}
