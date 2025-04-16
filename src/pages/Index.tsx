
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import PricingToggle from "@/components/PricingToggle";
import PricingCard, { PricingPlan } from "@/components/PricingCard";
import FeatureComparison from "@/components/FeatureComparison";
import Testimonials from "@/components/Testimonials";
import PlanRecommender from "@/components/PlanRecommender";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, CreditCard, Check, ArrowRight, BadgeCheck, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for individuals just getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 user",
      "5 GB storage",
      "Basic analytics",
      "24/7 email support",
      "Export to PDF",
      "Community forum access"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    recommendedFor: "personal projects"
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams with advanced needs",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      "5 users",
      "50 GB storage",
      "✨ Advanced analytics",
      "API access",
      "Priority email support",
      "Pro: API integrations",
      "Pro: Custom export formats"
    ],
    popularPlan: true,
    buttonText: "Start Free Trial",
    trialDays: 14,
    recommendedFor: "small teams and professionals"
  },
  {
    id: "business",
    name: "Business",
    description: "For organizations scaling their operations",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "15 users",
      "250 GB storage",
      "✨ Advanced analytics",
      "✨ API access",
      "Pro: Custom branding",
      "Pro: SSO integration",
      "Priority 24/7 support",
      "Pro: Advanced permissions"
    ],
    bestValue: true,
    buttonText: "Start Free Trial",
    trialDays: 14,
    recommendedFor: "growing businesses"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited users",
      "Unlimited storage",
      "✨ Custom analytics dashboard",
      "Dedicated account manager",
      "Custom onboarding",
      "Pro: Audit logs",
      "Pro: SLA guarantees",
      "24/7 phone support"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "enterprise",
    recommendedFor: "large organizations"
  },
];

const Index = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);
  const [daysLeft, setDaysLeft] = useState(5);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [currency, setCurrency] = useState("USD");
  
  const handleRecommendation = (planId: string) => {
    setRecommendedPlan(planId);
    const planElement = document.getElementById(planId);
    if (planElement) {
      planElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  // Simulate a trial countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      // Randomly increment/decrement days for demo purposes
      const randomChange = Math.random() > 0.7 ? -1 : 0;
      setDaysLeft(prev => Math.max(1, prev + randomChange));
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-purple-dark">
            Simple pricing for everyone
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always know what you'll pay. No hidden fees.
          </p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <Button 
                size="lg" 
                className="bg-brand-purple hover:bg-brand-purple-dark text-white"
              >
                Get Started Free
              </Button>
            </motion.div>
            <motion.div variants={item}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
              >
                <Sparkles size={16} className="mr-2" /> Book a Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-1" /> No credit card required
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-1" /> Free 14-day trial
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-1" /> Cancel anytime
            </div>
          </motion.div>
        </motion.div>
        
        {/* Currency Selector & Security Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
              className="text-sm flex items-center gap-1 text-muted-foreground hover:text-brand-purple"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard size={14} />
              {currency} <ArrowRight size={12} className={`transform transition-transform ${showCurrencySelector ? 'rotate-90' : ''}`} />
            </motion.button>
            
            {showCurrencySelector && (
              <motion.div 
                className="absolute mt-8 bg-white border rounded-md shadow-md z-10 grid grid-cols-3 gap-1 p-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {["USD", "EUR", "GBP", "CAD", "AUD", "JPY"].map((curr) => (
                  <button
                    key={curr}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-100 ${curr === currency ? "bg-brand-purple/10 text-brand-purple" : ""}`}
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencySelector(false);
                    }}
                  >
                    {curr}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center flex-wrap gap-3">
            <Badge variant="outline" className="text-xs border-gray-200 bg-white">
              <Shield size={12} className="mr-1 text-green-600" /> 
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="text-xs border-gray-200 bg-white">
              <BadgeCheck size={12} className="mr-1 text-blue-600" /> 
              SOC2 Certified
            </Badge>
            <Badge variant="outline" className="text-xs border-gray-200 bg-white">
              <Layers size={12} className="mr-1 text-amber-600" /> 
              ISO 27001
            </Badge>
          </div>
        </div>

        {/* Plan Recommender */}
        <PlanRecommender plans={plans} onRecommendation={handleRecommendation} />
        
        {/* Trial Info */}
        <motion.div 
          className="max-w-5xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-md p-4 flex flex-wrap gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              {daysLeft} Days Left
            </span>
            <p className="text-sm text-blue-700">
              in your free trial. Upgrade to keep access to all features.
            </p>
          </div>
          <div>
            <Button 
              variant="outline"
              className="text-xs h-8 border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Get 2 Extra Days <span className="ml-1 text-xs">🎁</span>
            </Button>
          </div>
        </motion.div>

        {/* Pricing Toggle */}
        <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all">
          {plans.map((plan) => (
            <div id={plan.id} key={plan.id}>
              <PricingCard 
                plan={plan} 
                isYearly={isYearly} 
                isRecommended={plan.id === recommendedPlan}
              />
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison plans={plans} />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <motion.div 
          className="mt-16 py-12 px-6 md:px-10 rounded-2xl bg-gradient-to-r from-brand-purple/90 to-brand-purple-dark/90 text-white text-center max-w-4xl mx-auto backdrop-blur-lg border border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Join thousands of companies that trust our platform for their subscription needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-brand-purple hover:bg-white/90"
            >
              Start Your Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Chatbot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Subscripter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
