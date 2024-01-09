import React, { useContext, useState, useEffect } from "react";
export const TokenContext = React.createContext();
export const useToken = () => {
    return useContext(TokenContext);
}
function TokenProvider({children}){
    const [tokenExists, setTokenExists] = useState(!!localStorage.getItem('token'));
    useEffect(()=>{
        const storageListener = () => {
            setTokenExists(!!localStorage.getItem('token'));
        };
        window.addEventListener('storage', storageListener);
        return () => {
            window.removeEventListener('storage', storageListener)
        }
    }, []);
    return (
        <TokenContext.Provider value={tokenExists}>
        {children}
        </TokenContext.Provider>
    );
}
export default TokenProvider
