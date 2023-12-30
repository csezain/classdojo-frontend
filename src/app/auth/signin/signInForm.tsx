"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Chrome } from "lucide-react";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formHook = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data: session } = useSession();

  async function onSubmit({ email, password }: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    const signedIn = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (signedIn && signedIn?.error == "not verified") {
      toast({
        title: "Email not verified",
        variant: "destructive",
      });
    } else if (signedIn && signedIn?.error === "user not found") {
      toast({
        title: "No User found",
        description: "No user found with this email address",
        variant: "destructive",
      });
    } else if (signedIn && signedIn?.error === "password mismatch") {
      toast({
        title: "Invalid Credentials!",
        description:
          "Please double check your email and password, retry again.",
        variant: "destructive",
      });
    } else if (signedIn && signedIn?.error) {
      toast({
        title: "Something wen't wrong!",
        description: "Something wen't wrong! please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your account has been successfully logged in !",
      });
    }
    setIsSubmitting(false);
  }

  async function loginWithGoogle(): Promise<void> {
    const signedIn = await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <Form {...formHook}>
      <form
        onSubmit={formHook.handleSubmit((data) => onSubmit(data))}
        className="w-2/3 space-y-6 p-2"
      >
        <FormField
          control={formHook.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Submit
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          type="button"
          className="w-full gap-2"
          onClick={loginWithGoogle}
        >
          <Chrome size={18} className="text-red-500" /> Sign in with Google
        </Button>

        <p className="text-sm">
          Don't have an account?{" "}
          <Link href={"/auth/signup"} className="text-primary">
            Create Acount!
          </Link>
        </p>
      </form>
    </Form>
  );
}
