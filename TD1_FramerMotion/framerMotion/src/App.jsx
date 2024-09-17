import './App.css';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

function App() {
  const constraintsRef = useRef(null);

  // scroll functionality
  const { scrollYProgress } = useScroll();

  // Map scroll position to background color (0-1 normalized scrollYProgress)
  const backgroundColor = useTransform(scrollYProgress, [0, 0.3], ['#3b82f6', '#ffffff']);

  // Map scroll position to opacity (0-1 normalized scrollYProgress)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Map scroll position to scale (0-1 normalized scrollYProgress)
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 5]);

  return (
    <>
      <motion.div
        style={{ backgroundColor }} 
        className="w-full flex-col p-12 gap-12 flex items-center justify-center text-white text-xl"
      >
        {/* Animated box with spring effect */}
        <motion.div 
          className='h-60 w-60 bg-blue-300 rounded-3xl flex flex-col items-center justify-center p-6'
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          style={{ opacity, scale }}
        > 
          <h1 className='text-2xl font-bold text-center'>Hello, Framer Motion!</h1>
          <p className='text-center'>This is a simple example of Framer Motion in motion</p>
        </motion.div>

        {/* Draggable box within constraints */}
        <motion.div 
          className='w-96 h-96 bg-blue-200 rounded-3xl p-12 overflow-hidden'  
          ref={constraintsRef}
          style={{ opacity }}
        >
          <motion.div 
            className='w-20 h-20 bg-blue-800 rounded-xl cursor-grab'
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ backgroundColor: 'red' }}
            whileTap={{ scale: 1.2, cursor: 'grabbing' }}

            // Apply opacity transformation
          />
        </motion.div>

        {/* Spacer div to allow scrolling */}
        <div className='h-screen'></div>
      </motion.div>
    </>
  );
}

export default App;
