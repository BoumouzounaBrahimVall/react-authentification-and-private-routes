import { useContext,useState,useEffect,createContext } from "react";
import { account } from "../appWriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [loading, setLoading]= useState(true);
    const [user,setUser]=useState(null);

    useEffect(()=>{
        checkUserStatus();
    },[]);

    const loginUser= async (userInfos)=>{
        setLoading(true);
        try {
            let response = await account.createEmailSession(
                userInfos.email,
                userInfos.password
            )
            let accountDetails= await account.get();

            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    const logoutUser=()=>{
        account.deleteSession('current');
        setUser(null);
    }

    const registerUser= async (userInfos)=>{
        setLoading(true);
        try {
            let response = await account.create(
                ID.unique(),
                userInfos.email,
                userInfos.password,
                userInfos.name
            );
            await account.createEmailSession(
                userInfos.email,
                userInfos.password
            )
            let accountDetails= await account.get();

            setUser(accountDetails);
        } catch (error) {
            console.error(error);

        }
        setLoading(false);
    }
    const checkUserStatus=async ()=>{

        try {
            let accountDetails = await account.get()
            setUser(accountDetails);
        } catch (error) {
            
        }

        setLoading(false);
    }
    const contextData={
        user,
        loginUser,
        logoutUser,
        registerUser
    };
    return(
        <AuthContext.Provider value={contextData}>
            {loading? <p>loading...</p>:children}
        </AuthContext.Provider>
    );
}
// create a costum hook instead of using 'useContext method'
export const useAuth=()=>{
    return useContext(AuthContext);
  }
export default AuthContext;