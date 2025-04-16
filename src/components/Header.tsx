
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sun, Moon, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

const EnterpriseContactModal: React.FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void }> = ({ 
  isOpen, 
  setIsOpen 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Talk to Enterprise Sales</DialogTitle>
          <DialogDescription>
            Fill out this form and our enterprise team will contact you shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Your work email"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="company" className="text-right text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Your company name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="message" className="text-right text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="col-span-3 min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about your needs"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-brand-purple">
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isSticky
            ? "py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              className="mr-2 text-2xl font-bold text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              Subscripter
            </motion.div>
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

          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={toggleTheme} 
              size="icon"
              className="hidden md:flex"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
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
              onClick={() => setModalOpen(true)}
            >
              <MessageSquare size={14} /> Talk to Sales
            </Button>
            
            <Button 
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && !isDesktop && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a href="#" className="py-2 text-sm font-medium hover:text-brand-purple transition-colors">
                  Features
                </a>
                <a href="#" className="py-2 text-sm font-medium hover:text-brand-purple transition-colors">
                  Pricing
                </a>
                <a href="#" className="py-2 text-sm font-medium hover:text-brand-purple transition-colors">
                  Resources
                </a>
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="ghost" onClick={toggleTheme} size="icon" className="h-8 w-8">
                    {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                  </Button>
                  <Button variant="ghost" className="flex-1 justify-start">
                    Log in
                  </Button>
                </div>
                <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white transition-colors">
                  Sign up
                </Button>
                <Button
                  className="items-center gap-2 border border-brand-purple text-brand-purple hover:bg-brand-purple/10 transition-colors"
                  variant="outline"
                  onClick={() => {
                    setModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <MessageSquare size={14} /> Talk to Sales
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <EnterpriseContactModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default Header;
