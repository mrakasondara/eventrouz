import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";

export const Hero = () => {
  return (
    <section className="grid flex-1 grid-cols-1 border-b-2 border-[#18181b] lg:grid-cols-2">
      <LeftSection />
      <RightSection />
    </section>
  );
};
