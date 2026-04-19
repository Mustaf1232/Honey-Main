"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonials } from "./home-page-client-wrapper";

export function TestimonialCarouselComponent({
  testimonials,
}: {
  testimonials: Testimonials;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.docs.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.docs.length) % testimonials.docs.length,
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="relative overflow-hidden shadow-none border-background">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarFallback>
                {testimonials.docs[currentIndex].testimonial_author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {testimonials.docs[currentIndex].testimonial_author}
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground">
            &apos;{testimonials.docs[currentIndex].testimonial_content}&apos;
          </p>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="bg-white border-background"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="bg-white border-background"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
