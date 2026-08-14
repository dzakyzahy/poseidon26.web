import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const VideoScrollSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Video Scrubbing with high precision onUpdate
      const video = videoRef.current;
      if (video) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Minimal smoothing for responsiveness
          onUpdate: (self) => {
            if (video.duration) {
              // Ensure we don't exceed duration or hit exactly 0 to avoid frame drops
              video.currentTime = Math.max(0.01, Math.min(video.duration - 0.05, video.duration * self.progress));
            }
          }
        });
      }

      // 2. Logo fades out as user scrolls
      gsap.to(logoContainerRef.current, {
        opacity: 0,
        scale: 1.5, // slightly zooms in as it fades
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "5% top",
          end: "20% top",
          scrub: true,
        }
      });

      // 3. Text fading sequences - Using a timeline to prevent overlap
      gsap.set([text1Ref.current, text2Ref.current], { y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% top",
          end: "80% top",
          scrub: true,
        }
      });

      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text1Ref.current, { opacity: 1, duration: 0.5 }) // Hold
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "+=0.5")
        .to(text2Ref.current, { opacity: 1, duration: 0.5 }) // Hold
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-ocean-900" id="video-sequence">
      {/* Fixed Logo that animates to Navbar */}
      <div 
        ref={logoContainerRef} 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center origin-top-left pointer-events-none mix-blend-difference"
      >
        <img src="/logos/logoPOSEIDON.png" alt="POSEIDON Logo" className="w-48 h-48 object-contain mb-6" />
        <h1 className="heading-lg whitespace-nowrap text-white text-glow text-center">
          POSEIDON <span className="text-bioluminescent-blue">2026</span>
        </h1>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video 
          ref={videoRef}
          src="/videos/Video_Scroll.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlay Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            className="absolute top-[10%] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase mb-4 opacity-70">Scroll To Explore</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
          </motion.div>

          <h2 ref={text1Ref} className="heading-lg absolute text-center opacity-0 font-serif text-white tracking-wide mix-blend-difference">
            Lautan..
          </h2>

          <h2 ref={text2Ref} className="heading-lg absolute text-center opacity-0 font-serif text-white tracking-wide mix-blend-difference">
            Sampah mengancam..
          </h2>
        </div>
      </div>
      

    </section>
  );
};

export default VideoScrollSequence;
