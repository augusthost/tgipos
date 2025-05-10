import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimationProps {
  children: ReactNode;
  as?: "div" | "span"; // Allow switching between div and span
  className?: string;
  onClick?: () => void;
}

export const FadeInUp: React.FC<AnimationProps> = ({
  children,
  as = "div",
  className,
  onClick,
}) => {
  const MotionComponent = as === "span" ? motion.span : motion.div;

  return (
    <MotionComponent
      className={className}
      onClick={onClick}
      style={{ opacity: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionComponent>
  );
};
