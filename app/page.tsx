import { Hero } from "@/components/landing/Hero";
import { RunningCategories } from "@/components/landing/RunningCategories";
import { Steps } from "@/components/landing/Steps";
import { Questions } from "@/components/landing/Questions/Questions";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents/FeaturedEvents";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col">
      <Hero />
      <RunningCategories />
      <FeaturedEvents/>
      <Steps />
      <Questions />
    </main>
  );
}
