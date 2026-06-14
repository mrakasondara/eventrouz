import { Hero } from "@/components/landing/Hero";
import { RunningCategories } from "@/components/landing/RunningCategories";
import { Promo } from "@/components/landing/Promo/Promo";
import { Steps } from "@/components/landing/Steps";
import { Questions } from "@/components/landing/Questions/Questions";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents/FeaturedEvents";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col">
      <Hero />
      <RunningCategories />
      <Promo />
      <FeaturedEvents />
      <Steps />
      <Questions />
    </main>
  );
}
