import VideoScrollSequence from '../components/intro/VideoScrollSequence';
import Hero3DScene from '../components/hero3d/Hero3DScene';
import { SponsorGrid } from '../components/intro/SponsorGrid';

export default function Home() {
  return (
    <main className="bg-ocean-900">
      <VideoScrollSequence />
      
      {/* Sponsor Section directly follows the video sequence */}
      <section className="relative z-20 w-full pt-16 pb-32">
        <SponsorGrid />
      </section>

      <Hero3DScene />
    </main>
  );
}
