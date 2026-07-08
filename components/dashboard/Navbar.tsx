"use client";

import { LogOut, BrainCircuit } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleLogout() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Failed to logout");
      return;
    }

    toast.success("Logged out successfully");

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/60 bg-card/80 px-8 backdrop-blur">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <BrainCircuit className="h-6 w-6" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          PrepAI
        </h1>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">
            {session?.user.name ?? "User"}
          </p>

          <p className="text-xs text-muted-foreground">
            {session?.user.email}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="hover:border-primary hover:text-primary"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}