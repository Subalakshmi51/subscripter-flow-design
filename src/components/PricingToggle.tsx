
import React from "react";
import { Switch } from "@/components/ui/switch";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ isYearly, setIsYearly }) => {
  return (
    <div className="flex flex-col items-center mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Simple, transparent pricing
      </h2>
      <div className="flex items-center gap-4">
        <span className={`${!isYearly ? "font-semibold" : "text-muted-foreground"}`}>Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-brand-purple"
        />
        <div className="flex items-center gap-2">
          <span className={`${isYearly ? "font-semibold" : "text-muted-foreground"}`}>Yearly</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Save 20%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PricingToggle;
