
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type PricingPlan } from "./PricingCard";

interface FeatureComparisonProps {
  plans: PricingPlan[];
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ plans }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Features to compare across plans
  const detailedFeatures = [
    { name: "Number of Users", values: ["1 user", "5 users", "15 users", "Unlimited"] },
    { name: "Storage Space", values: ["5 GB", "50 GB", "250 GB", "Unlimited"] },
    { name: "Support Response Time", values: ["48 hours", "24 hours", "12 hours", "1 hour"] },
    { name: "API Access", values: [false, true, true, true] },
    { name: "Custom Branding", values: [false, false, true, true] },
    { name: "Advanced Analytics", values: [false, false, true, true] },
    { name: "Dedicated Account Manager", values: [false, false, false, true] },
    { name: "Priority Support", values: [false, false, true, true] },
    { name: "SSO Integration", values: [false, false, true, true] },
    { name: "Audit Logs", values: [false, false, true, true] },
  ];

  return (
    <div className="my-16 animate-fade-in">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(!isOpen)}
        className="mx-auto block mb-8 border-brand-purple text-brand-purple hover:bg-brand-purple/10"
      >
        {isOpen ? "Hide Detailed Comparison" : "Show Detailed Comparison"}
      </Button>

      {isOpen && (
        <div className="overflow-x-auto rounded-lg border bg-white/50 backdrop-blur-sm shadow-sm transition-all animate-fade-in">
          <Table>
            <TableCaption>Detailed feature comparison across all plans</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Feature</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.id} className="text-center">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailedFeatures.map((feature, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  {feature.values.map((value, index) => (
                    <TableCell key={index} className="text-center">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check size={18} className="mx-auto text-brand-purple" />
                        ) : (
                          <X size={18} className="mx-auto text-muted-foreground/50" />
                        )
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default FeatureComparison;
