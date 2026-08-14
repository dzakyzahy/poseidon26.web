import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SponsorGrid } from './SponsorGrid';
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
      // 1. Video Scrubbing
      const video = videoRef.current;
      if (video) {
        // Use requestVideoFrameCallback for ultra-smooth scrubbing if available, else fallback
        
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA
              // Non-linear easing for scroll progress
              // We want faster progress at the beginning, then slower
              const p = self.progress;
              const easedProgress = 1 - Math.pow(1 - p, 3); // cubic ease out
              
              if ('requestVideoFrameCallback' in video) {
                (video as HTMLVideoElement).currentTime = (video as HTMLVideoElement).duration * easedProgress;
              } else {
                (video as HTMLVideoElement).currentTime = (video as HTMLVideoElement).duration * easedProgress;
              }
            }
          }
        });
      }

      // 2. Logo FLIP transition to Navbar (scrubbed)
      // The logo starts large at center, then shrinks and moves to top left (Navbar)
      gsap.to(logoContainerRef.current, {
        top: "1.5rem",
        left: "1.5rem",
        x: "0%",
        y: "0%",
        scale: 0.3, // Make it small
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "5% top", // Start animating down early
          end: "20% top", // Settle into navbar quickly
          scrub: true,
        }
      });

      // 3. Text fading sequences
      gsap.fromTo(text1Ref.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "30% top",
            end: "40% top",
            scrub: true
          }
        }
      );

      gsap.fromTo(text1Ref.current, 
        { opacity: 1 },
        { 
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "45% top",
            end: "50% top",
            scrub: true
          }
        }
      );

      gsap.fromTo(text2Ref.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "60% top",
            end: "70% top",
            scrub: true
          }
        }
      );
      
      gsap.fromTo(text2Ref.current, 
        { opacity: 1 },
        { 
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "75% top",
            end: "80% top",
            scrub: true
          }
        }
      );

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
      
      {/* Sponsor Grid Area at the end of the scroll */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-ocean-900 to-transparent pt-32 pb-32 z-20">
        <SponsorGrid />
      </div>
    </section>
  );
};

export default VideoScrollSequence;
