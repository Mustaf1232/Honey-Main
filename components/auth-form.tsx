"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
import { create_user, user_login } from "@/app/[locale]/account/actions";
type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  user_name: string;
  user_last_name: string;
  user_phone_number: string;
  user_birthday: string;
  email: string;
  password: string;
  confirm_password: string;
};
export type AuthFormTranslations = {
  login: string;
  enter_credentials: string;
  email: string;
  password: string;
  logging_in: string;
  register_question: string;
  register: string;
  create_account: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  confirm_password: string;
  have_account: string;
  personal_information: string;
  update_info: string;
  save_changes: string;
  sign_out: string;
  registering: string;
  birthday: string;
};
export default function AuthForm({
  translations,
}: {
  translations: AuthFormTranslations;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  const onLoginSubmit = async (data: LoginFormData) => {
    const response = await user_login(data.email, data.password);
    console.log("response", response);
    router.refresh();
    setIsSubmitting(false);
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    const create_user_object = {
      user_name: data.user_name,
      user_last_name: data.user_last_name,
      user_phone_number: data.user_phone_number,
      user_birthday: data.user_birthday,
      password: data.password,
      email: data.email,
      first_order: true,
    };
    try {
      const res = await create_user(create_user_object);
      if (res.errors && res.errors.length > 0) {
        throw new Error(res.errors[0].message);
      }

      toast({
        title: "Success",
        description: "User created successfully",
        variant: "default",
      });

      // Add a small delay before refreshing
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: `Error creating account: ${
          error instanceof Error ? error.message : String(error)
        }`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isLogin ? translations.login : translations.register}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? translations.enter_credentials
              : translations.create_account}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{translations.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...loginForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{translations.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    {...loginForm.register("password", {
                      required: "Password is required",
                    })}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                className="w-full mt-4 rounded-full bg-red-900"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? translations.logging_in : translations.login}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user_name">{translations.first_name}</Label>
                    <Input
                      id="user_name"
                      {...registerForm.register("user_name", {
                        required: "First name is required",
                      })}
                    />
                    {registerForm.formState.errors.user_name && (
                      <p className="text-sm text-red-500">
                        {registerForm.formState.errors.user_name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user_last_name">
                      {translations.last_name}
                    </Label>
                    <Input
                      id="user_last_name"
                      {...registerForm.register("user_last_name", {
                        required: "Last name is required",
                      })}
                    />
                    {registerForm.formState.errors.user_last_name && (
                      <p className="text-sm text-red-500">
                        {registerForm.formState.errors.user_last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_phone_number">
                    {translations.phone_number}
                  </Label>
                  <Input
                    id="user_phone_number"
                    type="tel"
                    {...registerForm.register("user_phone_number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]*$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {registerForm.formState.errors.user_phone_number && (
                    <p className="text-sm text-red-500">
                      {registerForm.formState.errors.user_phone_number.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_birthday">{translations.birthday}</Label>
                  <Input
                    id="user_birthday"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    {...registerForm.register("user_birthday", {
                      required: "Date of birth is required",
                    })}
                  />
                  {registerForm.formState.errors.user_birthday && (
                    <p className="text-sm text-red-500">
                      {registerForm.formState.errors.user_birthday.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{translations.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{translations.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    {...registerForm.register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">
                    {translations.confirm_password}
                  </Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    {...registerForm.register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === registerForm.watch("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {registerForm.formState.errors.confirm_password && (
                    <p className="text-sm text-red-500">
                      {registerForm.formState.errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                className="w-full mt-4 rounded-full bg-red-900"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? translations.registering
                  : translations.register}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? translations.register_question
              : translations.have_account}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
