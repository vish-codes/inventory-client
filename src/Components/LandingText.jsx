import { motion } from "framer-motion";
export default function LandingText({ headline, followUp, headCol }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="my-5 mx-14"
    >
      <h1
        className={`font-sans font-bold text-slate-800 text-7xl  text-center py-12`}
      >
        {headline}
      </h1>
      <p className=" mx-28 font-sans font-sm text-center text-xl text-slate-600 ">
        {followUp}
      </p>
    </motion.div>
  );
}
