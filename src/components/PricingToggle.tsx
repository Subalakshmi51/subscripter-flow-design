
import React from "react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ isYearly, setIsYearly }) => {
  return (
    <motion.div 
      className="flex flex-col items-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-purple-dark">
        Simple, transparent pricing
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Start with our forever-free plan or choose the perfect subscription for your needs
      </p>
      
      <div className="flex items-center gap-4 bg-secondary/50 p-1.5 rounded-full shadow-inner backdrop-blur-sm">
        <motion.span 
          className={`px-3 py-1 rounded-full transition-colors ${!isYearly ? "font-semibold bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
          layout
        >
          Monthly
        </motion.span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-brand-purple"
        />
        <div className="flex items-center gap-2">
          <motion.span 
            className={`px-3 py-1 rounded-full transition-colors ${isYearly ? "font-semibold bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
            layout
          >
            Yearly
          </motion.span>
          <motion.span 
            className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: isYearly ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            Save 20%
          </motion.span>
        </div>
      </div>
      
      {isYearly && (
        <motion.div 
          className="text-xs text-brand-purple-dark mt-2 bg-brand-purple/10 px-3 py-1 rounded-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          🎁 Get 2 months free with annual billing
        </motion.div>
      )}
    </motion.div>
  );
};

export default PricingToggle;
