
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  testimonial: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Morgan",
    role: "Marketing Director",
    company: "TechCorp",
    avatarUrl: "",
    testimonial:
      "Switching to this platform has transformed our team's productivity. The Business plan provides all the features we need at a fraction of the cost of competitors.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jamie Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    avatarUrl: "",
    testimonial:
      "As a startup founder, I appreciate the value the Pro plan offers. It's the perfect balance of features and affordability as we scale our business.",
    rating: 4,
  },
  {
    id: "3",
    name: "Sam Wilson",
    role: "Product Manager",
    company: "GrowthX",
    avatarUrl: "",
    testimonial:
      "The Enterprise tier has everything our large team needs. The dedicated support alone is worth the investment. Highly recommend!",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="my-16 animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Trusted by thousands of companies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="glass-card">
            <CardContent className="p-6">
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
              <p className="mb-6 text-sm">{testimonial.testimonial}</p>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
