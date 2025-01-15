"use client";
import Navbar from "./components/Navbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StocksGrid from "./components/StocksGrid";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import { AnimatePresence, easeInOut, motion } from "motion/react";

const queryClient = new QueryClient();

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen />}
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
            className="w-screen min-h-screen flex flex-col bg-white"
          >
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <StocksGrid searchTerm={debouncedTerm} />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default Home;
