
import React, { useState } from "react";
import { Check, X, AlertCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type PricingPlan } from "./PricingCard";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Feature {
  name: string;
  description?: string;
  values: (boolean | string)[];
  isPro?: boolean;
}

interface FeatureComparisonProps {
  plans: PricingPlan[];
}

const FeatureComparison: React.FC<FeatureComparisonProps> = ({ plans }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "differences">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Features to compare across plans with categories
  const featureCategories = [
    { id: "all", name: "All Features" },
    { id: "basic", name: "Basic" },
    { id: "collaboration", name: "Collaboration" },
    { id: "support", name: "Support" },
    { id: "security", name: "Security" },
    { id: "advanced", name: "Advanced" }
  ];

  const detailedFeatures: (Feature & { category: string })[] = [
    { 
      name: "Number of Users", 
      description: "Maximum number of user accounts that can access your organization",
      values: ["1 user", "5 users", "15 users", "Unlimited"],
      category: "basic" 
    },
    { 
      name: "Storage Space", 
      description: "Total storage for all your documents and files",
      values: ["5 GB", "50 GB", "250 GB", "Unlimited"],
      category: "basic" 
    },
    { 
      name: "Support Response Time", 
      description: "Maximum time before receiving a response from our support team",
      values: ["48 hours", "24 hours", "12 hours", "1 hour"],
      category: "support" 
    },
    { 
      name: "API Access", 
      description: "Ability to connect to our APIs for custom integrations",
      values: [false, true, true, true],
      category: "advanced",
      isPro: true 
    },
    { 
      name: "Custom Branding", 
      description: "Add your own logo and customize the interface appearance",
      values: [false, false, true, true],
      category: "advanced" 
    },
    { 
      name: "Advanced Analytics", 
      description: "Detailed metrics and insights on usage and performance",
      values: [false, true, true, true],
      category: "advanced",
      isPro: true 
    },
    { 
      name: "Dedicated Account Manager", 
      description: "A personal point of contact for all your needs",
      values: [false, false, false, true],
      category: "support" 
    },
    { 
      name: "Priority Support", 
      description: "Get to the front of the support queue for faster responses",
      values: [false, false, true, true],
      category: "support" 
    },
    { 
      name: "SSO Integration", 
      description: "Single Sign-On support for enterprise identity providers",
      values: [false, false, true, true],
      category: "security",
      isPro: true 
    },
    { 
      name: "Audit Logs", 
      description: "Track user activity and system changes",
      values: [false, false, true, true],
      category: "security" 
    },
    { 
      name: "Team Collaboration", 
      description: "Tools for working together with your team",
      values: [false, true, true, true],
      category: "collaboration" 
    },
    { 
      name: "Workspaces", 
      description: "Organize projects into separate collaborative spaces",
      values: ["1", "3", "10", "Unlimited"],
      category: "collaboration" 
    },
    { 
      name: "Advanced Permissions", 
      description: "Fine-grained control over who can access what",
      values: [false, false, true, true],
      category: "security" 
    },
    { 
      name: "Export Formats", 
      description: "Available formats for exporting your data",
      values: ["PDF only", "PDF, CSV", "PDF, CSV, JSON", "All formats"],
      category: "basic" 
    },
  ];

  // Filter features by selected category and differences if needed
  const filteredFeatures = detailedFeatures.filter(feature => {
    // Filter by category
    if (categoryFilter !== "all" && feature.category !== categoryFilter) {
      return false;
    }
    
    // Filter only differences
    if (viewMode === "differences") {
      const allSame = feature.values.every((value, _, array) => 
        typeof value === typeof array[0] && value === array[0]
      );
      return !allSame;
    }
    
    return true;
  });

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "all" ? "differences" : "all");
  };

  return (
    <div className="my-16">
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="mx-auto mb-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10 flex items-center gap-2"
        >
          {isOpen ? (
            <>
              <ChevronUp size={16} />
              Hide Detailed Comparison
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show Detailed Comparison
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">Compare all features across plans</p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="overflow-hidden rounded-lg border bg-white/50 backdrop-blur-sm shadow-sm transition-all"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 flex flex-wrap justify-between items-center gap-4 border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Toggle 
                  pressed={viewMode === "differences"} 
                  onPressedChange={toggleViewMode}
                  className="border-brand-purple/30 data-[state=on]:bg-brand-purple/10 data-[state=on]:text-brand-purple"
                >
                  <AlertCircle size={14} className="mr-1" />
                  Highlight Differences
                </Toggle>
              </div>
              
              <div className="flex-1 flex justify-end">
                <ToggleGroup 
                  type="single" 
                  value={categoryFilter} 
                  onValueChange={(value) => value && handleCategoryChange(value)}
                  className="bg-white shadow-sm rounded-md border p-1 overflow-x-auto max-w-full hide-scrollbar flex-wrap"
                >
                  {featureCategories.map(category => (
                    <ToggleGroupItem 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=on]:bg-brand-purple data-[state=on]:text-white text-xs px-3 whitespace-nowrap"
                    >
                      {category.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableCaption>Detailed feature comparison across all plans</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Feature</TableHead>
                    {plans.map((plan, index) => (
                      <TableHead 
                        key={plan.id} 
                        className={`text-center ${plan.popularPlan ? 'bg-brand-purple/10' : plan.bestValue ? 'bg-green-50' : ''}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-semibold">{plan.name}</span>
                          {plan.popularPlan && <Badge className="mt-1 bg-brand-purple">Popular</Badge>}
                          {plan.bestValue && <Badge className="mt-1 bg-green-500">Best Value</Badge>}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeatures.map((feature, idx) => {
                    const hasVariedValues = !feature.values.every((v, _, arr) => v === arr[0]);
                    
                    return (
                      <TableRow 
                        key={idx}
                        className={hasVariedValues && viewMode === "differences" ? "bg-yellow-50" : ""}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1">
                            {feature.name}
                            {feature.isPro && (
                              <Badge variant="outline" className="ml-1 text-[10px] py-0 px-1 border-brand-purple/30 text-brand-purple bg-brand-purple/5">
                                PRO
                              </Badge>
                            )}
                            {feature.description && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={14} className="text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>{feature.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        {feature.values.map((value, index) => {
                          // Determine if this cell should be highlighted in the differences view
                          const isHighlighted = viewMode === "differences" && hasVariedValues;
                          const isFirstYes = typeof value === "boolean" && value === true && 
                                            feature.values.findIndex(v => v === true) === index;
                          
                          return (
                            <TableCell 
                              key={index} 
                              className={`text-center ${isHighlighted && isFirstYes ? "bg-green-100" : ""}`}
                            >
                              {typeof value === "boolean" ? (
                                value ? (
                                  <Check size={18} className="mx-auto text-green-500" />
                                ) : (
                                  <X size={18} className="mx-auto text-muted-foreground/50" />
                                )
                              ) : (
                                <span className={isFirstYes ? "font-semibold" : ""}>{value}</span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureComparison;
