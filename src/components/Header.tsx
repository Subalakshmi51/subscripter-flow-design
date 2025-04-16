
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-2xl font-bold text-gradient">
            Subscripter
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Pricing
          </a>
          <a href="#" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Resources
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button 
            className="hidden md:inline-flex bg-brand-purple hover:bg-brand-purple-dark text-white transition-colors"
          >
            Sign up
          </Button>
          <Button
            className="hidden md:inline-flex items-center gap-2 border border-brand-purple text-brand-purple hover:bg-brand-purple/10 transition-colors"
            variant="outline"
          >
            <MessageSquare size={14} /> Talk to Sales
          </Button>
          <Button 
            className="md:hidden"
            variant="ghost"
            size="icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
