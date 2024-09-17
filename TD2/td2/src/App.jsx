import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cubicBezier } from "framer-motion/dom";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const easing = cubicBezier(0.17, 1.75, 0.28, -0.03);

  // randomize color when opening modal
  const randomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-gray-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <button
          className="bg-purple-500 text-purple-50 py-2 px-10 rounded-xl hover:bg-purple-50 font-semibold border-purple-500 hover:text-purple-400 shadow-sm"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="fixed inset-0 flex justify-center items-center"
              initial={{
                scale: 0,
                rotate: 180,
                skew: 360,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                skew: 0,
              }}
              exit={{
                scale: 0,
                rotate: 180,
                skew: 360,
              }}
              transition={{
                ease: easing,
                duration: 10,
              }}
            >
              <div
                className={` text-purple-50 p-8 rounded-lg shadow-lg w-80 ${randomColor()}`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Ceci est une modal
                </h2>
                <p className="mb-4">
                  OMG wawawiwa une modal c'est tres rare d'en voir
                </p>
                <button
                  className={`${randomColor()} text-white py-2 px-4 rounded-lg hover:bg-purple-900`}
                  onClick={() => setIsOpen(false)}
                >
                  fermer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
