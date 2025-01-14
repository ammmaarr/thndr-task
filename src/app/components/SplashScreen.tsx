"use client";
import Image from "next/image";
import logo from "../logo.png";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { easeInOut } from "motion";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 3;
        clearInterval(interval);
        return prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: easeInOut }}
      exit={{ opacity: 0 }}
      className="w-screen h-screen flex justify-center items-center bg-[#018FBF] fixed inset-0 z-10"
    >
      {progress > 0 && progress < 100 && (
        <div
          className="absolute top-0 left-0 bg-white h-4 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      )}
      <div className="md:w-1/4 md:h-1/4 w-1/2 h-1/2 flex justify-center items-center">
        <Image src={logo} alt="Nasdaq Logo" />
      </div>
      <h1 className="absolute text-white text-center bottom-20 left-1/2 -translate-x-1/2 font-semibold tracking-widest uppercase">
        Created by: <br className="block md:hidden" />
        <a
          className="hover:text-gray-300 transition-all duration-300"
          href="https://www.linkedin.com/in/ammmaarr/"
        >
          Ammar Almahdy
        </a>
      </h1>
    </motion.div>
  );
};

export default SplashScreen;
