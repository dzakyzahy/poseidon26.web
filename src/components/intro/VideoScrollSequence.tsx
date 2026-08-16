import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const VideoScrollSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFishRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Video Sequence Scrubbing
      const video = videoRef.current;
      
      const setupVideoScrub = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Add a bit of smoothing
          onUpdate: (self) => {
            if (video && video.duration) {
              // Ensure we don't try to seek past the end or before start
              video.currentTime = Math.max(0, Math.min(video.duration - 0.1, self.progress * video.duration));
            }
          }
        });
      };

      if (video) {
        // We must wait for metadata to know the duration
        if (video.readyState >= 1) {
          setupVideoScrub();
        } else {
          video.addEventListener('loadedmetadata', setupVideoScrub);
        }
        
        // Pause the video initially to prevent auto-playing if some browsers try to
        video.pause();
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

      // Progress Bar visibility (fades in after Scroll To Explore fades out, fades out at the end)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "95% bottom",
          scrub: true,
        }
      })
      .fromTo(progressContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.05 }) // fade in at 10%
      .to(progressContainerRef.current, { opacity: 1, duration: 0.9 }) // hold
      .to(progressContainerRef.current, { opacity: 0, duration: 0.05 }); // fade out at 95%

      // Progress Bar scaling
      gsap.fromTo(progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Progress Fish movement (moving down)
      gsap.fromTo(progressFishRef.current,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

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

      // 3. Text fading sequences - Synced to exact frames
      gsap.set([text1Ref.current, text2Ref.current], { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Dummy tween to force timeline duration to match frameCount (246)
      tl.to({}, { duration: 246 });

      // Frame 91: Lautan..
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 15 }, 91)
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 10 }, 130);

      // Frame 160: Sampah mengancam..
      tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 15 }, 160)
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 10 }, 200);


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[500vh] relative" id="video-sequence">
      {/* Vertical Progress Bar */}
      <div 
        ref={progressContainerRef}
        className="fixed top-[20%] left-4 md:left-12 h-[60%] w-8 z-[100] opacity-0 pointer-events-none mix-blend-difference flex flex-col items-center"
      >
        <div className="absolute top-0 w-[2px] h-full bg-white/20 overflow-hidden border-l border-dashed border-white/50">
          <div 
            ref={progressBarRef}
            className="absolute top-0 w-full bg-bioluminescent-green origin-top scale-y-0"
            style={{ height: '100%' }}
          />
        </div>
        <img 
          ref={progressFishRef}
          src="/models/greenfish_2d.png"
          alt="Fish Progress"
          onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234ade80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'; }}
          className="absolute top-0 w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
          style={{ transform: "translateY(-50%) rotate(90deg)" }}
        />
      </div>

      {/* Fixed Logo and Title */}
      <div 
        ref={logoRef}
        className="fixed top-[55%] right-[5%] md:top-[20%] md:left-[10%] md:right-auto flex flex-row md:flex-col items-center justify-end md:justify-start gap-4 z-50 pointer-events-none mix-blend-difference"
      >
        <img 
          src="/Logo_ITB.png" 
          alt="ITB Logo" 
          className="w-12 h-12 md:w-40 md:h-40 object-contain" 
        />
        <img 
          src="/logos/logoPOSEIDON.png" 
          alt="POSEIDON Logo" 
          className="w-16 h-16 md:w-56 md:h-56 object-contain" 
        />
      </div>
      <h1 
        ref={titleRef}
        className="fixed top-[22%] md:top-1/4 right-[5%] md:right-[10%] text-3xl md:text-[4.5rem] leading-none font-sans font-bold tracking-tighter text-white z-50 flex flex-col items-end text-right pointer-events-none mix-blend-difference"
      >
        Persembahan<br />
        <span className="text-bioluminescent-blue font-serif italic text-3xl md:text-[4.5rem] mt-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Oseanografi</span>
        <span className="text-white text-2xl md:text-[3.5rem] my-2">untuk</span>
        <span className="text-bioluminescent-blue font-serif italic text-3xl md:text-[4.5rem] mt-1 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Indonesia</span>
      </h1>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video Background for Sequence */}
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
        </div>
      </div>
      

    </section>
  );
};

export default VideoScrollSequence;
