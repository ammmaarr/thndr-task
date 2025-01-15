import { easeInOut } from "motion";
import { motion } from "motion/react";
import React from "react";
import { StockItem } from "../interfaces";

const StockCard: React.FC<{
  item: StockItem;
  index: number;
  i: number;
  onClick: (ticker: string) => void;
}> = ({ item, index, i, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: easeInOut,
        delay: (i === 1 ? i : 0) + index * 0.1,
      }}
      className={
        "rounded-lg p-4 flex flex-col justify-center items-center gap-8 bg-main transition-all cursor-pointer hover:scale-95 duration-300"
      }
      onClick={() => onClick(item.ticker)}
    >
      <h1 className="text-white text-3xl font-semibold">{item.ticker}</h1>
      <h2 className="text-white text-lg tracking-tighter text-center text-pretty">
        {item.name}
      </h2>
    </motion.div>
  );
};

export default StockCard;
