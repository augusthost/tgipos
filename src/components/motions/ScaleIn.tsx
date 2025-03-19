import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  as?: "div" | "span"; // Allow switching between div and span
  className?: string
}

export const ScaleIn: React.FC<AnimationProps> = ({ children, as = "div" , className }) => {
  const MotionComponent = as === "span" ? motion.span : motion.div;

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionComponent>
  );
};
