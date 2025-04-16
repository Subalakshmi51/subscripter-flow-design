
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  testimonial: string;
  rating: number;
  planType?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Marketing Director",
    company: "TechCorp",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    testimonial:
      "Switching to this platform has transformed our team's productivity. The Business plan provides all the features we need at a fraction of the cost of competitors.",
    rating: 5,
    planType: "Business"
  },
  {
    id: "2",
    name: "Jamie Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    testimonial:
      "As a startup founder, I appreciate the value the Pro plan offers. It's the perfect balance of features and affordability as we scale our business.",
    rating: 4,
    planType: "Pro"
  },
  {
    id: "3",
    name: "Sam Wilson",
    role: "Product Manager",
    company: "GrowthX",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    testimonial:
      "The Enterprise tier has everything our large team needs. The dedicated support alone is worth the investment. Highly recommend!",
    rating: 5,
    planType: "Enterprise"
  },
  {
    id: "4",
    name: "Eliza Johnson",
    role: "Freelance Designer",
    company: "Self-employed",
    avatarUrl: "https://i.pravatar.cc/150?img=24",
    testimonial:
      "Started with the Free plan and upgraded to Pro as my business grew. The seamless scaling and intuitive interface make this my go-to platform.",
    rating: 5,
    planType: "Pro"
  },
  {
    id: "5",
    name: "David Kim",
    role: "CTO",
    company: "FutureTech",
    avatarUrl: "https://i.pravatar.cc/150?img=42",
    testimonial:
      "The Enterprise plan's custom integrations and priority support have been game-changers for our engineering team. Worth every penny.",
    rating: 5,
    planType: "Enterprise"
  }
];

const Testimonials: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0);
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setActiveDot(current);
  }, [current]);

  const companyLogos = [
    "https://companieslogo.com/img/orig/AAPL-bf1a4314.png?t=1632523695", // Apple
    "https://companieslogo.com/img/orig/MSFT-a203b22d.png?t=1633073277", // Microsoft
    "https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695", // Amazon
    "https://companieslogo.com/img/orig/GOOGL-abc9c9d8.png?t=1633218501", // Google
    "https://companieslogo.com/img/orig/META-1564fdd1.png?t=1654568585", // Meta
    "https://companieslogo.com/img/orig/NFLX-67df6e63.png?t=1627120930", // Netflix
    "https://companieslogo.com/img/orig/CRM-8c78c95e.png?t=1633074363"  // Salesforce
  ];

  return (
    <div className="my-16">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Trusted by thousands of companies
        </h2>
        <div className="flex items-center justify-center">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Star className="h-3 w-3 fill-green-500 text-green-500 mr-1" />
            4.9 rating from 10,000+ reviews
          </Badge>
        </div>
      </motion.div>

      <div className="relative">
        <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto px-4">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card h-full">
                    <CardContent className="p-6">
                      <Quote size={24} className="text-brand-purple opacity-40 mb-2" />
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mb-6 text-sm line-clamp-4">{testimonial.testimonial}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {testimonial.avatarUrl ? (
                              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                            ) : (
                              <AvatarFallback className="bg-brand-purple/10 text-brand-purple">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                        {testimonial.planType && (
                          <Badge variant="outline" className="bg-brand-purple/10 text-brand-purple border-brand-purple/20 text-xs">
                            {testimonial.planType} Plan
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 py-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === activeDot ? "bg-brand-purple w-5" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      <motion.div 
        className="mt-24 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-center text-muted-foreground mb-6">Trusted by innovative companies worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 px-4">
          {companyLogos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt="Company logo" 
              className="h-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
