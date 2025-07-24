import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { assets } from "../assets/assets";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Define the shape of the context value
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl || "http://localhost:4000/api/v1";
axios.defaults.withCredentials = true; // optional: for cookies/auth sessions
axios.defaults.headers.common["Content-Type"] = "application/json";
interface AppContextType {
  user: boolean;
  setUser: (user: boolean) => void;
  showLogin: boolean;
  setShowLogin: (showLogin: boolean) => void;
  image: string;
  setImage: (image: string) => void;
  backendUrl: string;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  credit: boolean;
  setCredit: React.Dispatch<React.SetStateAction<boolean>>;
  login: (state: string, body: loginBody) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout:()=>Promise<void>;
  credits:creditBody | null;
  setCredits:React.Dispatch<React.SetStateAction<creditBody | null>>;
  generateImage:(prompt:string) =>Promise<void>
  isImageLoaded:boolean;
  setIsImageLoaded:React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with default value as undefined (will use provider to supply it)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props for the provider
interface AppContextProviderProps {
  children: ReactNode;
}
interface loginBody {
  name?: string;
  email: string;
  password: string;
}

interface creditBody{
  name:string,
    email:string,
    password:string,
    creditBalance:string
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useState<boolean>(false);
  const [image, setImage] = useState(assets.sample_img_1);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credits,setCredits]=useState<creditBody | null>(null);
   const [isImageLoaded,setIsImageLoaded]=useState(false);
  const navigate= useNavigate();

  const login = async (state: string, body: loginBody) => {
    setLoading(true);
    try {
      const response = await axios.post(state.toLowerCase(), body);
      console.log(response?.data);
      if (response?.data?.success) {
        toast.success(state === "Login" ? "User Logged In" : "User Signed In");
        setShowLogin(false);
        localStorage.setItem("token", response?.data?.token);
        setToken(localStorage.getItem("token"));
        setUser(true);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", err);
    }
    finally{
      setLoading(false)
    }
  }

    const logout = async () => {
      setLoading(true);
    try {
      const response = await axios.get("logout");
      if(response?.data?.success)
      {
        toast.success("Log out")
        localStorage.removeItem("token");
        setUser(false);
        setToken(null);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
      console.error("Logout error:", err);
    }
    finally{
      setLoading(false);
    }  
  };

  const loadCredits = async() => {
    try{

      const response = await axios.get("userCredits");
      if(response?.data?.success)
      {
        setCredits(response?.data?.data || 0);
      }

    }catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  }

  const generateImage = async (prompt:string) => {
    try{
      const response = await axios.post("generateImage",{prompt});
      if(response?.data?.success)
      {
        setImage(response?.data?.data);
        loadCredits();
        setIsImageLoaded(true);

      }
      else{
    
          toast.error(response?.data?.message);
          loadCredits();
          if(Number(credits?.creditBalance) <= 0)
          {
            navigate("credits")
          }
          setIsImageLoaded(false)
      }
    }catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Issue in Image Generation";
      toast.error(errorMessage);
    }
  }

      //USE-EFFECTS
  useEffect(() => {
      
    

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken); // will already set `user = true` if done below
        setUser(true); // ✅ Important: update the user state on mount
      } else {
        setUser(false); // optional, to be explicit
      }
    }, []); // 🔁 empty dependency so it runs only once on initial load

    useEffect(()=>{
      if(token)
        loadCredits();
      else
        setUser(false);
    },[token])
  const value: AppContextType = {
    user,
    setUser,
    image,
    setImage,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    login, logout,
    loading,
    setLoading,
    credits, setCredits,
    generateImage,
    isImageLoaded,
    setIsImageLoaded
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
