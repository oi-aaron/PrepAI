import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth/server";
import Navbar from "@/components/dashboard/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-8">
        {children}
      </main>
    </div>
  );
}