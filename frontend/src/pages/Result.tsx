
import { useState } from "react";
import { useAppContext } from "../Context/AppContext"
import {motion} from "framer-motion"

const Result = () => {
  const {image,generateImage,isImageLoaded,setIsImageLoaded}= useAppContext(); 
 
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState("");
  const [blockClick,setBlockClick]=useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.stopPropagation();
    e.preventDefault();

    if(blockClick)return;
    setLoading(true);
    setBlockClick(true);

    
   try{
     if(input.trim())
    {
      await generateImage(input);
    }

   }catch(err)
   {
    console.log(err)
   }
   finally{
    setLoading(false);
    setBlockClick(false);
   }
    
  }
  return (
    <motion.form action="" onSubmit={(e)=>handleSubmit(e)} className="flex flex-col min-h-[90vh] justify-center items-center"
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
    <div>
      <div className="relative">
        <img src={image} alt="" className="max-w-sm rounded" />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? "w-full transition-all duration-[10s]" : "w-0"}`}/>
      </div>
      <p className={`${!loading ? "hidden" : ""}`}>Loading...</p>
      
    </div>

   {
   
   !isImageLoaded ? <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 rounded-full mt-10">
      <input type="text" placeholder="Describe What You Want to Generate" className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color" onChange={(e)=>setInput(e.target.value)} value={input}/>
      <button type="submit" className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white cursor-pointer">Generate</button>
    </div>
    :
    <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
      <p className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer " onClick={()=>setIsImageLoaded(false)}>Generate Another</p>
      <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">Download</a>
    </div>}
    </motion.form>
  )
}

export default Result