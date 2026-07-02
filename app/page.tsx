import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
          Step 1 Complete
        </p>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          PrepAI Foundation
        </h1>
        <p className="text-muted-foreground max-w-lg text-lg">
          Next.js, Tailwind CSS, shadcn/ui, ESLint, and Prettier are configured.
          The landing page, auth, and dashboard come in the next steps.
        </p>
        <Button size="lg">Foundation Ready</Button>
      </div>
    </div>
  );
}
