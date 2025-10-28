import BackgroundParticles from "@/components/background-particles";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mountain } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundParticles />
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
         <Link href="/home" className="flex items-center gap-2 z-10">
          <Mountain className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            UFR-AI
          </span>
        </Link>
        <div className="z-10">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
