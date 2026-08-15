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
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  const text3Ref = useRef<HTMLHeadingElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Video Scrubbing with high precision onUpdate
      const video = videoRef.current;
      if (video) {
        video.pause();
        const updateScroll = () => { ScrollTrigger.refresh(); };
        video.addEventListener('loadedmetadata', updateScroll);

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Native scroll scrub
          onUpdate: (self) => {
            if (video.readyState >= 1 && !Number.isNaN(video.duration) && video.duration > 0) {
              // Ensure we don't exceed duration or hit exactly 0 to avoid frame drops
              video.currentTime = Math.max(0.01, Math.min(video.duration - 0.05, video.duration * self.progress));
            }
          }
        });
      }

      // 2. Logo and Title fade out as user scrolls
      gsap.to(logoRef.current, {
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
      gsap.to(titleRef.current, {
        opacity: 0,
        x: 50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "1% top",
          end: "15% top",
          scrub: true,
        }
      });
      gsap.to(scrollTextRef.current, {
        opacity: 0,
        y: 20,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "1% top",
          end: "10% top",
          scrub: true,
        }
      });

      // Video blur & fade out at the end of scroll
      gsap.to(videoRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "85% top",
          end: "100% top",
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
      {/* Fixed Logo (Left) and Title (Right) */}
      <div 
        ref={logoRef}
        className="fixed top-[20%] left-[5%] md:left-[10%] flex flex-col items-center gap-4 z-50 pointer-events-none mix-blend-difference"
      >
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
          <img 
            src="/Logo_ITB.png" 
            alt="ITB Logo" 
            className="w-16 h-16 md:w-40 md:h-40 object-contain" 
          />
          <img 
            src="/logos/logoPOSEIDON.png" 
            alt="POSEIDON Logo" 
            className="w-20 h-20 md:w-56 md:h-56 object-contain" 
          />
        </div>
      </div>
      <h1 
        ref={titleRef}
        className="fixed top-1/4 right-[5%] md:right-[10%] text-7xl md:text-[10rem] leading-none font-sans font-bold tracking-tighter text-white z-50 flex flex-col items-end text-right pointer-events-none mix-blend-difference"
      >
        POSEIDON<br />
        <span className="text-bioluminescent-blue font-serif italic text-5xl md:text-[7rem] mt-2">ITB 2026</span>
      </h1>

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
          <div 
            ref={scrollTextRef}
            className="absolute bottom-[8%] left-[5%] md:left-[10%] flex flex-col items-start"
          >
            <span className="font-sans text-xs md:text-xl tracking-[0.3em] font-medium uppercase opacity-80 text-white mix-blend-difference">Scroll To Explore</span>
          </div>

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
