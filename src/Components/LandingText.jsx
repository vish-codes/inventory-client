import { motion } from "framer-motion";

export default function LandingText({ headline, followUp, headCol }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="my-10 mx-2 md:mx-14 sm:mt-4 md:mt-16"
    >
      <h1
        className={`font-sans font-bold text-slate-800 text-4xl md:text-6xl lg:text-7xl text-center py-6 md:py-12`}
      >
        {headline}
      </h1>
      <p className="mx-4 md:mx-8 lg:mx-28 font-sans text-base md:text-lg lg:text-xl text-center text-slate-600">
        {followUp}
      </p>
    </motion.div>
  );
}
