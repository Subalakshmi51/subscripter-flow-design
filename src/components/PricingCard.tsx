
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
}

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly }) => {
  return (
    <div 
      className={`relative glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-card-hover group ${
        plan.popularPlan ? "border-brand-purple border-2 shadow-card" : "border-gray-100 shadow-card"
      }`}
    >
      {plan.popularPlan && (
        <div className="popular-badge animate-fade-in">Most Popular</div>
      )}
      {plan.bestValue && (
        <div className="popular-badge bg-green-500 animate-fade-in">Best Value</div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
        <div className="flex items-end gap-1 mb-1">
          <span className="text-3xl font-bold">
            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
          </span>
          <span className="text-muted-foreground mb-1">
            /{isYearly ? "year" : "month"}
          </span>
        </div>
        {isYearly && (
          <div className="text-sm text-green-600 mb-4">
            ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} saved annually
          </div>
        )}
      </div>

      <div className="space-y-2 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="feature-item">
            <Check size={16} className="text-brand-purple flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        className={`w-full transition-all group-hover:scale-105 ${
          plan.buttonVariant === "outline"
            ? "border-brand-purple text-brand-purple hover:bg-brand-purple/10"
            : plan.buttonVariant === "enterprise"
            ? "bg-white text-brand-purple border border-brand-purple hover:bg-brand-purple/10"
            : "bg-brand-purple hover:bg-brand-purple-dark text-white"
        }`}
        variant={plan.buttonVariant === "outline" ? "outline" : "default"}
      >
        {plan.buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
