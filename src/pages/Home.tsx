import VideoScrollSequence from '../components/intro/VideoScrollSequence';
import { SponsorGrid } from '../components/intro/SponsorGrid';
import Background3D from '../components/hero3d/Background3D';

export default function Home() {
  return (
    <>
      <Background3D />
      <main className="relative z-10 w-full overflow-hidden">
        <VideoScrollSequence />
        
        {/* Sponsor Section directly follows the video sequence */}
        <section className="relative z-20 w-full pt-32 pb-32 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="bg-ocean-900/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl overflow-hidden">
            <SponsorGrid />
          </div>
        </section>

        {/* Extra space to enjoy the 3D scene */}
        <div className="h-[50vh] w-full pointer-events-none" />
      </main>
    </>
  );
}
