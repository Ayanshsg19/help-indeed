import React from "react"
import { io } from 'socket.io-client';

const GlobalContext = React.createContext();

export function useGlobalContext() {
    return React.useContext(GlobalContext)
}

export function GlobalContextProvider({ children }) {

    const socket = io('http://localhost:3001');
    const value = {
        socket,
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}