
import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "We cut down our ops tools from 11 to 1 — and doubled productivity within 30 days. PulseOS is a game-changer.",
      author: "Maya L.",
      role: "COO, ScaleUp"
    },
    {
      quote: "It's like Notion, Slack, Airtable, and Monday had a baby — but smarter and simpler.",
      author: "Raj S.",
      role: "Founder, Finverse"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          💬 What Our Users Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-card/30 border border-border/20 rounded-xl backdrop-blur-sm space-y-6">
              <Quote className="w-8 h-8 text-purple-400 mx-auto" />
              <blockquote className="text-lg text-foreground italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
