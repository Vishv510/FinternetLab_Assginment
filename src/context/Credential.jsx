import { createContext, useState } from "react";
import Portfolio from "../pages/Portfolio";


export const Credential = createContext({
    userName: "",
    userId: "",
    checkpoints: {
        kyc: false,
        income: false,
        wallet: false,
    },
    Portfolio: [],
    setUserName: () => {},
    setUserId: () => {},
    setCheckpoints: () => {},
    addToPortfolio: () => {}
});

export function CredentialProvider({children}){
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    const [checkpoints, setCheckpoints] = useState({
        kyc: false,
        income: false,
        wallet: false
    });

    const [portfolio, setPortfolio] = useState([]);

    const addToPortfolio = (property) => {
        setPortfolio((prev) => [...prev, property]);
    };

    return (
        <Credential.Provider value={{userName, userId, checkpoints, portfolio,setUserName, setUserId, setCheckpoints, addToPortfolio}}>
            {children}
        </Credential.Provider>
    )
}
