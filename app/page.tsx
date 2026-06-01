import { Hero } from "@/components/landing/Hero";
import { Header } from "@/components/layout/Header";
import { RunningCategories } from "@/components/landing/RunningCategories";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col">
      <Header />
      <Hero />
      <RunningCategories />
    </main>
  );
}
