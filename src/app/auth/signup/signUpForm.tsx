"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { submitSignup } from "./signup.action";
import { useState } from "react";
import VerificationBox from "./verificationBox";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignUpForm() {
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
  const formHook = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await submitSignup(data);
    if (response.success) {
      toast({
        title: "Success!",
        description:
          "Your account has been created. Please check your email to verify your account.",
      });
      setIsAccountCreated(true);
    } else {
      if (response.error === "duplicate_email") {
        toast({
          title: "Error!",
          description:
            "This email is already in use. Please use a different email.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error!",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  }
  if (isAccountCreated) {
    return <VerificationBox />;
  }

  return (
    <Form {...formHook}>
      <form
        onSubmit={formHook.handleSubmit((data) => onSubmit(data))}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={formHook.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formHook.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formHook.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
