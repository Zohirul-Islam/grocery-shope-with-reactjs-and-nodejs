import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

 const AppContext = createContext();

 const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const value = {
        navigate,user,setUser,isSeller,setIsSeller,showUserLogin, setShowUserLogin
    }
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export default AppContextProvider;

export const useAppContext = () => {
    return useContext(AppContext);
}