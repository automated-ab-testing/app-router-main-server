"use client";

import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import AppNavbar from "~/components/AppNavbar";

export default function RootTemplate({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppNavbar />
      {children}
      <Toaster />
    </motion.div>
  );
}
