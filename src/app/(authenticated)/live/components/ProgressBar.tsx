import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  numerator: number;
  denominator: number;
};

export function ProgressBar({ numerator, denominator }: Props) {
  const [progress, setProgress] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const newProgress = (numerator / denominator) * 100;
    setProgress(newProgress);

    // Trigger the pulse animation
    setPulse(true);
    const timeout = setTimeout(() => setPulse(false), 300); // 300ms matches pulse duration
    return () => clearTimeout(timeout);
  }, [numerator, denominator]);

  return (
    <div className="relative w-full h-full bg-base-300 rounded-lg overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-base-100 to-base-300 rounded-lg shadow-inner"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-primary rounded-lg"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Pulse Effect */}
      <AnimatePresence>
        {pulse && (
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary opacity-50 rounded-lg"
            style={{ width: `${progress}%` }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
