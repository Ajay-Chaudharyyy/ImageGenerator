import { assets } from "../assets/assets"
import {motion} from "framer-motion"
import { useAppContext } from "../Context/AppContext"
import { useNavigate } from "react-router-dom";

const GenerateButton = () => {
  const {user,setShowLogin}=useAppContext();
  const navigate= useNavigate();

  const clickHandler = () => {
    if(user)
    {
      navigate("/result")
    }
    else{
      setShowLogin(true);
    }
  }
  return (
    <motion.div className="pb-16 text-center"
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">See the Magic. Try Now</h1>
        <motion.button className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500 cursor-pointer"
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{default:{duration:0.5},opacity:{delay:0.8,duration:1}}}

        onClick={clickHandler}
        >Generate Images
            <img src={assets.star_group} className="h-6" alt="" />
        </motion.button>
    </motion.div>
  )
}

export default GenerateButton