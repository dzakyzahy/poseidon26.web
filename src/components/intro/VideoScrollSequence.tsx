import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const VideoScrollSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFishRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Image Sequence Scrubbing
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        const frameCount = 189;
        const currentFrame = (index: number) => 
          `/images/sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
        
        const images: HTMLImageElement[] = [];
        const imageObj = { frame: 0 };
        
        // Preload images
        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
          images.push(img);
        }

        const render = () => {
          if (context && images[imageObj.frame]) {
            // Draw image to fill canvas (cover)
            const img = images[imageObj.frame];
            if (img.complete) {
              const canvasRatio = canvas.width / canvas.height;
              const imgRatio = img.width / img.height;
              let drawWidth = canvas.width;
              let drawHeight = canvas.height;
              let offsetX = 0;
              let offsetY = 0;

              if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
              } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
              }

              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
          }
        };

        // Resize canvas
        const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          render();
        };
        window.addEventListener('resize', resize);
        resize();

        // Ensure first frame renders on load
        images[0].onload = render;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Add a bit of smoothing
          onUpdate: (self) => {
            const frameIndex = Math.min(
              frameCount - 1,
              Math.floor(self.progress * frameCount)
            );
            imageObj.frame = frameIndex;
            requestAnimationFrame(render);
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

      // Progress Bar visibility (fades in after Scroll To Explore fades out)
      gsap.fromTo(progressContainerRef.current, 
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "10% top",
            end: "15% top",
            scrub: true,
          }
        }
      );

      // Progress Bar scaling
      gsap.fromTo(progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Progress Fish movement
      gsap.fromTo(progressFishRef.current,
        { left: "0%" },
        {
          left: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Video/Canvas blur & fade out at the end of scroll
      gsap.to(canvasRef.current, {
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
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { y: 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Dummy tween to force timeline duration to match frameCount (189)
      tl.to({}, { duration: 189 });

      // Frame 96: Lautan..
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 10 }, 96)
        .to(text1Ref.current, { opacity: 0, y: -50, duration: 10 }, 116);

      // Frame 138: Sampah mengancam..
      tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 10 }, 138)
        .to(text2Ref.current, { opacity: 0, y: -50, duration: 10 }, 158);

      // Frame 170: Selamat Datang..
      tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 10 }, 170);


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[500vh] relative" id="video-sequence">
      {/* Progress Bar */}
      <div 
        ref={progressContainerRef}
        className="fixed top-0 left-0 w-full h-1.5 z-[100] opacity-0 pointer-events-none mix-blend-difference"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/20" />
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-0 h-full bg-bioluminescent-green w-full origin-left scale-x-0"
        />
        <img 
          ref={progressFishRef}
          src="/models/greenfish_2d.png" // We will assume there's a 2D icon, or we can use a generic fish shape. Wait, I will use CSS or an existing logo if it doesn't exist. Actually, let's just use the trident logo as fallback if greenfish_2d.png doesn't exist, but I'll set src to an emoji or standard icon for now. Let me use an emoji or fallback image. I'll use the greenfish_2d.png but fallback to emoji if it fails.
          alt="Fish Progress"
          onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234ade80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'; e.currentTarget.className = "absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"; }}
          className="absolute top-1/2 -translate-y-1/2 -ml-6 w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
        />
      </div>

      {/* Fixed Logo and Title */}
      <div 
        ref={logoRef}
        className="fixed top-[42%] right-[5%] md:top-[20%] md:left-[10%] md:right-auto flex flex-row md:flex-col items-center justify-end md:justify-start gap-4 z-50 pointer-events-none mix-blend-difference"
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
        <span className="text-bioluminescent-blue font-serif italic text-4xl md:text-[5.5rem] mt-2 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Oseanografi</span>
        <span className="text-white">untuk</span>
        <span className="text-bioluminescent-blue font-serif italic text-4xl md:text-[5.5rem] mt-1 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">Indonesia</span>
      </h1>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas Background for Image Sequence */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
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

          <h2 ref={text3Ref} className="heading-lg absolute text-center font-serif text-white tracking-wide mix-blend-difference flex flex-col items-center">
            <span>Selamat Datang di</span>
            <span className="font-sans text-bioluminescent-blue italic text-4xl md:text-7xl mt-4 block">Website POSEIDON ITB 2026</span>
          </h2>
        </div>
      </div>
      

    </section>
  );
};

export default VideoScrollSequence;
