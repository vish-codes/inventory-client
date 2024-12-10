import { motion } from "framer-motion";

export default function DownArrow() {
  return (
    <motion.div className="flex items-center justify-center mt-6 px-4">
      <motion.img
        initial={{ y: 0 }} // Initial position
        animate={{ y: [-10, 0, -10] }} // Animation sequence
        transition={{ repeat: Infinity, duration: 1 }}
        className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-20 lg:w-20"
        src="./images/down-arrow (1).png"
        alt="arrow"
      />
    </motion.div>
  );
}
