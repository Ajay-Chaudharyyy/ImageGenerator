import { assets, testimonialsData } from "../assets/assets"
import {motion} from "framer-motion"

const Testimonials = () => {
  return (
    <motion.div className="flex flex-col items-center justify-center my-20 py-12 "
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2 ">Customer Testimonials</h1>
        <p className="text-gray-500 mb-12">What Our Users are Saying</p>
        <div className="flex flex-wrap gap-6">
            { testimonialsData.map((val,index)=>(
                <div key={index} className="bg-white/20 p-12 rouded-lg shadow-lg w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300">
                    <div className="flex flex-col items-center"><img src={val.image} alt="" className="rounded-full w-14"/>
                    <h2 className="text-xl font-semibold mt-3">{val.name}</h2>
                    <p className="text-gray-500 mb-4">{val.role}</p>
                    <div className="flex mb-4">
                        {Array(val.stars).fill("").map((_,index)=>(
                            <img src={assets.rating_star} alt="" key={index}/>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-600">{val.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Testimonials