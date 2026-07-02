"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

import AuthCard from "./AuthCard";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

    const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z.string().email("Enter a valid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  async function onSubmit(data: SignupFormData) {
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  
    if (error) {
      toast.error(error.message);
      return;
    }
  
    toast.success("Account created successfully!");
    setTimeout(() => {
        router.push("/dashboard");
      }, 800);
  }

  return (
    <AuthCard
      title="Create your account"
      description="Start preparing smarter with PrepAI"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>

          <Input
            placeholder="Aaron Singh"
            {...register("name")}
          />

          <p className="text-sm text-red-500">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            placeholder="aaron@email.com"
            {...register("email")}
          />

          <p className="text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            {...register("password")}
          />

          <p className="text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <Label>Confirm Password</Label>

          <Input
            type="password"
            {...register("confirmPassword")}
          />

          <p className="text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
  href="/login"
  className="font-semibold text-blue-600 hover:underline"
>
  Login
</Link>
        </p>
      </form>
    </AuthCard>
  );
}   