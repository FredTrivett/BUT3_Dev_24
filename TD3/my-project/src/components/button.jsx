import { cva } from "class-variance-authority";
import { FaEdge } from "react-icons/fa";

const base = "base flex items-center justify-center transition duration-200 ease-in-out"; 

const buttonVariants = cva(base, {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white hover:bg-blue-600", 
      secondary: "bg-gray-500 text-white hover:bg-gray-600", 
      alert: "bg-red-500 text-white hover:bg-red-600",
      desactive: "bg-gray-300 text-gray-500 cursor-not-allowed",
      outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
    },
    size: {
      small: "px-2 py-1 text-sm", 
      medium: "px-4 py-2 text-base", 
      large: "px-6 py-3 text-lg", 
    },
    rounde: {
      rd: "rounded-full", 
      md: "rounded-xl", 
      nrd: "rounded-md", 
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export default function ButtonCVA({
  className,
  intent,
  size,
  rounde,
  children,
  edge,
  ...props
}) {
  return (
    <button
      className={buttonVariants({ intent, size, rounde, className })}
      {...props}
    >
      {children}
      {edge && <FaEdge className="ml-2"/>}
    </button>
  );
}