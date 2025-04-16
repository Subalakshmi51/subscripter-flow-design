
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, User, Building, Building2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { type PricingPlan } from "./PricingCard";

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface PlanRecommenderProps {
  plans: PricingPlan[];
  onRecommendation: (planId: string) => void;
}

const PlanRecommender: React.FC<PlanRecommenderProps> = ({ plans, onRecommendation }) => {
  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);
  const [hasRecommended, setHasRecommended] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "How many team members will be using the platform?",
      options: ["Just me", "2-5 people", "6-15 people", "15+ people"]
    },
    {
      id: 2,
      text: "What's your primary goal with our service?",
      options: ["Basic needs", "Growth & analytics", "Team collaboration", "Enterprise-grade features"]
    },
    {
      id: 3,
      text: "How important is advanced support to you?",
      options: ["Not important", "Somewhat important", "Very important", "Critical - need dedicated support"]
    }
  ];

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question answered, determine recommendation
      const recommendation = determineRecommendation(newAnswers);
      setRecommendedPlan(recommendation);
      setHasRecommended(true);
      onRecommendation(recommendation);
    }
  };

  const determineRecommendation = (userAnswers: string[]): string => {
    // Simple algorithm to determine the recommended plan based on answers
    const scoreMap: Record<string, number> = {
      "free": 0,
      "pro": 0,
      "business": 0,
      "enterprise": 0
    };
    
    // First question: team size
    if (userAnswers[0] === "Just me") {
      scoreMap.free += 3;
      scoreMap.pro += 1;
    } else if (userAnswers[0] === "2-5 people") {
      scoreMap.pro += 3;
      scoreMap.business += 1;
    } else if (userAnswers[0] === "6-15 people") {
      scoreMap.business += 3;
      scoreMap.enterprise += 1;
    } else {
      scoreMap.enterprise += 3;
    }
    
    // Second question: primary goal
    if (userAnswers[1] === "Basic needs") {
      scoreMap.free += 3;
      scoreMap.pro += 1;
    } else if (userAnswers[1] === "Growth & analytics") {
      scoreMap.pro += 3;
      scoreMap.business += 1;
    } else if (userAnswers[1] === "Team collaboration") {
      scoreMap.business += 3;
      scoreMap.pro += 1;
    } else {
      scoreMap.enterprise += 3;
      scoreMap.business += 1;
    }
    
    // Third question: support needs
    if (userAnswers[2] === "Not important") {
      scoreMap.free += 2;
      scoreMap.pro += 1;
    } else if (userAnswers[2] === "Somewhat important") {
      scoreMap.pro += 2;
      scoreMap.business += 1;
    } else if (userAnswers[2] === "Very important") {
      scoreMap.business += 2;
      scoreMap.enterprise += 1;
    } else {
      scoreMap.enterprise += 3;
    }
    
    // Find the plan with the highest score
    let highestScore = 0;
    let recommendedPlan = "pro"; // Default
    
    Object.entries(scoreMap).forEach(([plan, score]) => {
      if (score > highestScore) {
        highestScore = score;
        recommendedPlan = plan;
      }
    });
    
    return recommendedPlan;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendedPlan(null);
    setHasRecommended(false);
  };

  const closeDialog = () => {
    setOpen(false);
    resetQuiz();
  };

  const renderIcon = (plan: string) => {
    switch (plan) {
      case "free":
        return <User className="h-8 w-8 text-brand-purple" />;
      case "pro":
        return <Building className="h-8 w-8 text-brand-purple" />;
      case "business":
        return <Building2 className="h-8 w-8 text-brand-purple" />;
      case "enterprise":
        return <Users className="h-8 w-8 text-brand-purple" />;
      default:
        return null;
    }
  };

  const getPlanName = (planId: string): string => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.name : "Pro";
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        variant="outline" 
        className="mb-8 mx-auto border-brand-purple/60 text-brand-purple hover:bg-brand-purple/10 flex items-center gap-2 group"
      >
        <Sparkles size={16} className="text-brand-purple group-hover:animate-pulse" />
        Which plan is right for you?
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Sparkles size={18} className="text-brand-purple mr-2" />
                Find Your Perfect Plan
              </span>
              <Button size="icon" variant="ghost" onClick={closeDialog} className="h-6 w-6">
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Answer a few quick questions to get a personalized recommendation
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <AnimatePresence mode="wait">
              {!hasRecommended ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between mb-4 text-xs text-muted-foreground">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  
                  <div className="relative pt-1 mb-6">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                      <motion.div 
                        initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-purple"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">
                    {questions[currentQuestion].text}
                  </h3>
                  
                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((option, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left mb-2 hover:border-brand-purple hover:text-brand-purple"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="recommendation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  <Badge className="mb-2 bg-brand-purple">AI Recommendation</Badge>
                  <div className="rounded-full bg-brand-purple/10 p-4 mb-4">
                    {renderIcon(recommendedPlan || "pro")}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {getPlanName(recommendedPlan || "pro")} Plan
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Based on your answers, we recommend the {getPlanName(recommendedPlan || "pro")} plan for your needs.
                  </p>
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={resetQuiz}
                    >
                      Restart Quiz
                    </Button>
                    <Button 
                      className="flex-1 bg-brand-purple"
                      onClick={closeDialog}
                    >
                      View {getPlanName(recommendedPlan || "pro")}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanRecommender;
