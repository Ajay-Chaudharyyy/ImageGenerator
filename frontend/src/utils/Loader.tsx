import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        className="w-20 h-20 rounded-full border-[8px] border-t-transparent border-b-transparent 
          border-l-blue-600 border-r-white "
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
