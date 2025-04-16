
import React, { useState } from "react";
import Header from "@/components/Header";
import PricingToggle from "@/components/PricingToggle";
import PricingCard, { PricingPlan } from "@/components/PricingCard";
import FeatureComparison from "@/components/FeatureComparison";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
      "24/7 email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For small teams and growing businesses",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      "5 users",
      "50 GB storage",
      "Advanced analytics",
      "API access",
      "Priority email support"
    ],
    popularPlan: true,
    buttonText: "Upgrade Now",
  },
  {
    id: "business",
    name: "Business",
    description: "For larger teams with advanced needs",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "15 users",
      "250 GB storage",
      "Advanced analytics",
      "API access",
      "Custom branding",
      "SSO integration",
      "Priority 24/7 support"
    ],
    bestValue: true,
    buttonText: "Upgrade Now",
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
      "Custom analytics dashboard",
      "Dedicated account manager",
      "Custom onboarding",
      "Audit logs",
      "24/7 phone support"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "enterprise",
  },
];

const Index = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple pricing for everyone
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always know what you'll pay. No hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-brand-purple hover:bg-brand-purple-dark text-white"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
            >
              <Sparkles size={16} className="mr-2" /> Book a Demo
            </Button>
          </div>
        </div>

        {/* Pricing Toggle */}
        <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all animate-fade-in">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison plans={plans} />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <div className="mt-16 py-12 px-6 md:px-10 rounded-2xl bg-gradient-to-r from-brand-purple/90 to-brand-purple-dark/90 text-white text-center max-w-4xl mx-auto backdrop-blur-lg border border-white/10 shadow-xl animate-fade-in">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
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
