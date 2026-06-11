import { ImmersiveHero } from "@/components/home/immersive-hero";
import { FoundationChapters } from "@/components/home/foundation-chapters";
import { ResourcesCta } from "@/components/home/resources-cta";
import { ChapterNav } from "@/components/home/chapter-nav";

export default function HomePage() {
  return (
    <>
      <ImmersiveHero />
      <FoundationChapters />
      <ResourcesCta />
      <ChapterNav />
    </>
  );
}
