"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ContactInfoType } from "@/types";
import { send_contact_message } from "@/app/[locale]/contact/actions";
import { useToast } from "@/hooks/use-toast";

export type ContactFormProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
};

export type ContactTranslations = {
  contact_us: string;
  contact_paragraph: string;
  first_name: string;
  first_name_placeholder: string;
  last_name: string;
  last_name_placeholder: string;
  email: string;
  email_placeholder: string;
  phone: string;
  phone_placeholder: string;
  message: string;
  message_placeholder: string;
  send_message: string;
};

export default function Component({
  translations,
  contact_info,
}: {
  translations: ContactTranslations;
  contact_info: ContactInfoType;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormProps>();
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormProps) => {
    setIsSubmitting(true);
    const contact_object: ContactFormProps = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      message: data.message,
    };

    try {
      await send_contact_message(contact_object);
      setSubmitStatus("success");
      reset();
      toast({
        title: "Message sent successfully",
        description: "We will get back to you soon.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error sending message", error);
      setSubmitStatus("error");
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader>
          <CardTitle>{translations.contact_us}</CardTitle>
          <CardDescription>{translations.contact_paragraph}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="first_name">{translations.first_name}</Label>
                  <Input
                    id="first_name"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                  />
                  {errors.first_name && (
                    <span className="text-red-500 text-sm">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="last_name">{translations.last_name}</Label>
                  <Input
                    id="last_name"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-sm">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">{translations.email}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">{translations.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone_number", {
                    pattern: {
                      value: /^[0-9+\-\s()]*$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone_number && (
                  <span className="text-red-500 text-sm">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">{translations.message}</Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>
            <Button
              className="w-full rounded-full bg-red-800 text-white mt-4"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : translations.send_message}
            </Button>
          </form>
          {submitStatus === "success" && (
            <p className="text-green-500 mt-2">Message sent successfully!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 mt-2">
              Error sending message. Please try again.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{contact_info.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{contact_info.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{contact_info.address}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
