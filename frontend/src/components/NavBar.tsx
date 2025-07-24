import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppContext } from "../Context/AppContext"
import { useEffect, useRef, useState } from "react";


const NavBar = () => {
    const {user,setShowLogin,logout,credits}=useAppContext();
    const [showLogout,setShowLogout]=useState(false);
    const [blockClick,setBlockClick]=useState(false);

    const logoutRef = useRef<HTMLDivElement>(null); // 🟡 ref for the dropdown

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false); // 👈 close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    const navigate = useNavigate();

    const handleLogout = async (e:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        
        e.stopPropagation();
        if(blockClick) return;
        try{
            setBlockClick(true);
            await logout();
            setShowLogout(false);
        }
        catch(err)
        {
            console.error(err)
        }
        finally{
            setBlockClick(false);
        }
    }
  return (
    <div className="w-full flex justify-between items-center py-4">
        <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40"/>
        </Link>


        
        <div>
           { user ? 
           ( <div className="flex items-center justify-center gap-2 sm:gap-3">
            <button onClick={()=>navigate("/credits")} className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
                <img src={assets.credit_star} alt="" className="w-5"/>
                <p className="text-xs sm:text-sm font-medium text-gray-600 ">Credit Left : {`${credits?.creditBalance}`}</p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {credits?.name}</p>
            <div className="relative cursor-pointer" onClick={()=>setShowLogout(!showLogout)} ref={logoutRef}> <img src={assets.profile_icon} alt="" className="w-10 drop-shadow" />
            <div className="absolute  top-0 right-0 z-10 text-black rounded pt-12" >
                {showLogout && <ul className="list-none m-0 px-1 py-1 text-center bg-white rounded-full shadow-lg text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10 text-sm" onClick={(e)=>handleLogout(e)}>Logout</li>
                </ul>}
            </div>
            </div>
            
           </div>)
            :
           ( <div  className="flex items-center justify-center gap-2">
            {/* <p className="cursor-pointer" onClick={()=>navigate("/credits")}>Pricing</p> */}
            <button className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer" onClick={()=>setShowLogin(true)} >Login</button>
           </div>)}
        </div>
    </div>
  )
}

export default NavBar