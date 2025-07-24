import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { useAppContext } from "../Context/AppContext";
import {motion} from "framer-motion"
const Login = () => {
    const [state,setState]=useState("Login");
    const {setShowLogin,login}= useAppContext();
    const [blockClick, setBlockClick]=useState(false);
    const [form,setForm]=useState({
      name:"",
      email:"",
      password:""
    })
    useEffect(()=>{
        document.body.style.overflow="hidden";

        return ()=>{document.body.style.overflow = "unset"}
    },[])

    const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setBlockClick(true);
      try{
        const endPoint = state === "Login" ? "login" : "signup"
        await login(endPoint,form);

      }catch(err)
      {
        console.log(err);
      }
      finally{
        setBlockClick(false);
      }
    }
  return (

    
    <div className="fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
         <motion.form action="" className="relative bg-white p-10 rounded-xl text-slate-500"
         initial={{opacity:0.2,y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={(e)=>formHandler(e)}
         >

            <h1 className="text-center text-2xl text-neutral-700 font-medium mb-4">{state}</h1>
            <p className="text-sm">Welcome back! Please Sign In to continue</p>
           {state !== "Login" && <div className="shadow-lg px-4 py-2 flex items-center gap-2 justify-start rounded-full mt-5">
                <img src={assets.profile_icon} alt="" width={30}/>
                <input type="text" placeholder="Enter Full Name..." required className="outline-none text-sm"
                onChange={(e)=>setForm((prev)=> ( {...prev, name: e.target.value}))} value={form.name}/>
            </div>}
            <div className="shadow-lg px-6 py-2 flex items-center gap-3 justify-start rounded-full mt-4">
                <img src={assets.email_icon} alt="" />
                <input type="email" placeholder="Enter Email..." required className="outline-none text-sm"
                onChange={(e)=>setForm((prev)=> ( {...prev, email: e.target.value}))} value={form.email}/>
            </div>
            <div className="shadow-lg px-6 py-2 flex items-center gap-4 justify-start rounded-full mt-4">
                <img src={assets.lock_icon} alt="" />
                <input type="password" placeholder="Enter Password..." required className="outline-none text-sm"
                onChange={(e)=>setForm((prev)=> ( {...prev, password: e.target.value}))} value={form.password}/>
            </div>

            <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password</p>
            <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer" disabled={blockClick}>{state === "Login" ? "Login" :"Create Account"}</button>

           {state === "Login" ?  <p className="mt-5 text-center">Don't have an Account? <span className="text-blue-600 cursor-pointer" onClick={()=>setState("Sign Up")}>Sign Up</span></p>
           :
            <p className="mt-5 text-center">Already have an Account? <span className="text-blue-600 cursor-pointer" onClick={()=>setState("Login")}>Log In</span></p>}

            <img src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" onClick={()=>setShowLogin(false)}/>
         </motion.form>

    </div>
   
  )
}

export default Login