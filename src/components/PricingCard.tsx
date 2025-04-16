
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popularPlan?: boolean;
  bestValue?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline" | "enterprise";
  highlighted?: boolean;
  trialDays?: number;
  recommendedFor?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  isRecommended?: boolean;
}

const FeatureItem = ({ feature }: { feature: string }) => {
  const isPro = feature.includes("Pro:") || feature.includes("✨");
  const cleanFeature = feature.replace("Pro: ", "").replace("✨ ", "");

  return (
    <motion.div 
      className="feature-item group"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="flex-shrink-0">
        <Check size={16} className={`${isPro ? "text-brand-purple" : "text-green-500"}`} />
      </div>
      <span className={`text-sm ${isPro ? "font-medium" : ""}`}>
        {cleanFeature}
        {isPro && (
          <Badge variant="outline" className="ml-2 text-[10px] py-0 px-1 border-brand-purple/30 text-brand-purple bg-brand-purple/5">
            PRO
          </Badge>
        )}
      </span>
    </motion.div>
  );
};

const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly, isRecommended }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
  };

  return (
    <motion.div
      className={`relative glass-card p-6 rounded-2xl transition-all duration-300 h-full flex flex-col justify-between ${
        plan.popularPlan || isRecommended
          ? "border-brand-purple border-2 shadow-xl"
          : plan.bestValue 
            ? "border-green-400 border-2 shadow-xl" 
            : "border-gray-100 hover:border-gray-200"
      } ${plan.highlighted ? "ring-2 ring-brand-purple ring-offset-2" : ""}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: plan.id === "pro" ? 0.1 : plan.id === "business" ? 0.2 : plan.id === "enterprise" ? 0.3 : 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      {plan.trialDays && (
        <motion.div 
          className="absolute -top-3 -left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
          animate={{ rotate: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {plan.trialDays}-Day Free Trial
        </motion.div>
      )}
      
      {plan.popularPlan && (
        <motion.div 
          className="popular-badge"
          animate={{ rotate: isHovered ? -5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Most Popular
        </motion.div>
      )}
      
      {plan.bestValue && (
        <motion.div 
          className="popular-badge bg-green-500"
          animate={{ rotate: isHovered ? -5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Best Value
        </motion.div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1 flex items-center">
          {plan.name}
          {isRecommended && (
            <Badge variant="outline" className="ml-2 bg-brand-purple/10 text-brand-purple border-brand-purple/20">
              <Sparkles size={12} className="mr-1" /> Recommended
            </Badge>
          )}
        </h3>
        {plan.recommendedFor && (
          <p className="text-xs text-muted-foreground mb-2">
            Ideal for {plan.recommendedFor}
          </p>
        )}
        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
        
        <div className="flex items-end gap-1 mb-1">
          <motion.span 
            className="text-3xl font-bold"
            key={`${plan.id}-${isYearly ? 'yearly' : 'monthly'}-price`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
          </motion.span>
          <motion.span 
            className="text-muted-foreground mb-1"
            key={`${plan.id}-${isYearly ? 'yearly' : 'monthly'}-period`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            /{isYearly ? "year" : "month"}
          </motion.span>
        </div>
        
        {isYearly && plan.monthlyPrice > 0 && (
          <div className="text-sm text-green-600 mb-4 flex items-center">
            <Shield size={14} className="mr-1" />
            ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} saved annually
          </div>
        )}
        
        {plan.trialDays && (
          <div className="text-sm text-brand-purple mb-4 flex items-center">
            <Clock size={14} className="mr-1" />
            {plan.trialDays}-day free trial, no credit card required
          </div>
        )}
      </div>

      <div className="space-y-2 mb-8">
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </div>
      
      <motion.div className="mt-auto">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className={`w-full transition-all ${
              plan.buttonVariant === "outline"
                ? "border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                : plan.buttonVariant === "enterprise"
                ? "bg-white text-brand-purple border border-brand-purple hover:bg-brand-purple/10"
                : "bg-brand-purple hover:bg-brand-purple-dark text-white"
            } group`}
            variant={plan.buttonVariant === "outline" ? "outline" : "default"}
          >
            {plan.buttonText}
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        
        {plan.id !== "free" && (
          <p className="text-center text-xs text-muted-foreground mt-2">
            Secured by <span className="font-medium">Stripe</span>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PricingCard;
