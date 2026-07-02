"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthCard from "./AuthCard";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully!");
    setTimeout(() => {
        router.push("/dashboard");
      }, 800);
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Login to continue your interview preparation"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            placeholder="aaron@email.com"
            {...register("email")}
          />

          <p className="text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            {...register("password")}
          />

          <p className="text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Login"}
        </Button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}