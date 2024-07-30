import { motion } from "framer-motion";

export default function DownArrow() {
  return (
    <motion.div className="flex items-center justify-center mt-6 px-4">
      <motion.img
        initial={{ y: 0 }} // Initial position
        animate={{ y: [-10, 0, -10] }} // Animation sequence
        transition={{ repeat: Infinity, duration: 1 }}
        className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-24 lg:w-24"
        src="./images/down-arrow (1).png"
        alt="arrow"
      />
    </motion.div>
  );
}
