import { Hero } from "@/components/Hero";
import { BentoFeatures } from "@/components/BentoFeatures";
import { SocialProof } from "@/components/SocialProof";
import { Waitlist } from "@/components/Waitlist";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { StickerRow } from "@/components/IllustrationDivider";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center relative">
      <InteractiveBackground />
      <Navigation />
      <Hero />
      <BentoFeatures />
      <StickerRow
        leftSrc="/owl-book-sticker-nobg.png"
        leftAlt="Friendly owl with a book"
        rightSrc="/castle-transparent.png"
        rightAlt="Whimsical fairy-tale castle"
      />
      <SocialProof />
      <Waitlist />
      <Footer />
    </main>
  );
}
