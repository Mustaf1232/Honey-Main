"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faqs, Faq } from "@/types";

type FaqTranslations = {
  search_faqs: string;
};

export default function FaqComponent({
  faqs,
  tranlsations,
}: {
  faqs: Faqs;
  tranlsations: FaqTranslations;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.faq_array.filter(
    (faq: Faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto shadow-none border-background">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              type="search"
              placeholder={tranlsations.search_faqs}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No matching questions found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
