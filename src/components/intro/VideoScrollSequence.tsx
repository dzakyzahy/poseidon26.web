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

  const text3Ref = useRef<HTMLHeadingElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Video Scrubbing with high precision onUpdate
      const video = videoRef.current;
      if (video) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Native scroll scrub
          onUpdate: (self) => {
            if (video.readyState >= 1 && video.duration) {
              // Ensure we don't exceed duration or hit exactly 0 to avoid frame drops
              video.currentTime = Math.max(0.01, Math.min(video.duration - 0.05, video.duration * self.progress));
            }
          }
        });
      }

      // 2. Logo fades out as user scrolls
      gsap.to(logoContainerRef.current, {
        opacity: 0,
        x: -50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "1% top",
          end: "15% top",
          scrub: true,
        }
      });

      // 3. Text fading sequences - Using a timeline to prevent overlap
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "90% top",
          scrub: true,
        }
      });

      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(text1Ref.current, { opacity: 1, duration: 0.5 }) // Hold
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "+=0.2")
        .to(text2Ref.current, { opacity: 1, duration: 0.5 }) // Hold
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, "+=0.2")
        .to(text3Ref.current, { opacity: 1, duration: 0.5 }) // Hold
        .to(text3Ref.current, { opacity: 0, y: -50, duration: 1 })
        .to(text4Ref.current, { opacity: 1, y: 0, duration: 1.5 }, "+=0.2")
        .to(text4Ref.current, { opacity: 1, duration: 2 }); // Hold until end


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[500vh] relative bg-ocean-900" id="video-sequence">
      {/* Fixed Logo that animates to Navbar */}
      <div 
        ref={logoContainerRef} 
        className="fixed top-1/4 left-[10%] md:left-[15%] z-50 flex flex-col items-start origin-top-left pointer-events-none mix-blend-difference"
      >
        <img src="/logos/logoPOSEIDON.png" alt="POSEIDON Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain mb-6" />
        <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-white">
          POSEIDON<br />
          <span className="text-bioluminescent-blue font-serif italic text-3xl md:text-5xl">ITB 2026</span>
        </h1>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video 
          ref={videoRef}
          src="/videos/Video_Scroll.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlay Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div 
            className="absolute bottom-[10%] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 opacity-70">Scroll To Explore</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
          </motion.div>

          <h2 ref={text1Ref} className="heading-lg absolute text-center font-serif text-white tracking-wide mix-blend-difference">
            Lautan..
          </h2>

          <h2 ref={text2Ref} className="heading-lg absolute text-center font-serif text-white tracking-wide mix-blend-difference">
            Sampah mengancam..
          </h2>

          <h2 ref={text3Ref} className="heading-lg absolute text-center font-serif text-white tracking-wide mix-blend-difference">
            Selamat Datang di
          </h2>

          <div ref={text4Ref} className="absolute flex flex-col items-center text-center max-w-4xl mx-auto mix-blend-difference">
            <h2 className="heading-lg font-sans font-bold mb-6">
              TENTANG <span className="text-bioluminescent-blue font-serif italic">POSEIDON ITB</span>
            </h2>
            <p className="body-lg text-white/90 leading-relaxed font-sans font-light">
              POSEIDON ITB 2026 adalah program Pengabdian Masyarakat inovatif yang berfokus pada restorasi ekologi pesisir dan pemberdayaan masyarakat di Pantai Imut Jongor, Cirebon. Kami hadir sebagai solusi berkelanjutan untuk menghadapi tantangan abrasi dan pencemaran laut.
            </p>
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default VideoScrollSequence;
