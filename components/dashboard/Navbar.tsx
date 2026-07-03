"use client";

import { LogOut } from "lucide-react";
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
    <nav className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        PrepAI
      </h1>

      {/* User Info + Logout */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold">
            {session?.user.name ?? "User"}
          </span>

          <span className="text-xs text-muted-foreground">
            {session?.user.email}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}