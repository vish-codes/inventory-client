import { motion } from "framer-motion";
export default function DownArrow() {
  return (
    <motion.div className="flex items-center justify-center mt-6">
      <motion.img
        initial={{ y: 0 }} // Initial position
        animate={{ y: [-10, 0, -10] }} // Animation sequence
        transition={{ repeat: Infinity, duration: 1 }}
        className="h-20 w-20"
        src="./images/down-arrow (1).png"
        alt="arrow"
      />
    </motion.div>
  );
}
