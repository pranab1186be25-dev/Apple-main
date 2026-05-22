import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Tera image file
import iph from '../assets/iph.png' 

gsap.registerPlugin(ScrollTrigger);

const IPhoneOneShot = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const bgTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        paused: true, 
        defaults: { ease: "expo.out", duration: 0.8 } 
      });

      tl
        
        .fromTo(bgTextRef.current, 
          { scale: 0.8, opacity: 0 }, 
          { scale: 1.2, opacity: 0.05, duration: 1.2 }
        )
       
        .fromTo(imageRef.current, 
          { y: 300, scale: 1.3, filter: "blur(15px)", opacity: 0 }, 
          { y: 0, scale: 1, filter: "blur(0px)", opacity: 1, duration: 1 },
          "-=0.9" 
        )
       
        .fromTo([".oneshot-text", ".oneshot-btn"], 
          { y: 40, opacity: 0, scale: 0.9 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            stagger: 0.08, 
            duration: 0.8,
            ease: "power4.out"
          }, 
          "-=0.7"
        )
        
        .to(imageRef.current, {
          y: "-=15",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%", 
        onEnter: () => tl.play(),
        once: true 
      });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;
        gsap.to(imageRef.current, { rotateY: xPos, rotateX: -yPos, duration: 0.6 });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#fbfbfd] flex flex-col items-center justify-center overflow-hidden px-6">
      
      
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[35vw] font-black text-black select-none tracking-tighter italic">
          17e
        </h1>
      </div>

      
      <div ref={contentRef} className="relative z-20 text-center mb-8">
        <h1 className="oneshot-text text-5xl md:text-8xl font-black text-[#1d1d1f] tracking-tighter leading-none">
          iPhone 17e
        </h1>
        <p className="oneshot-text text-xl md:text-3xl text-zinc-500 font-medium mt-2">
          Feature stacked. Value packed.
        </p>

        
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => window.open('https://www.apple.com/in/iphone-17e/', '_blank')}
            className="oneshot-btn bg-[#0071e3] text-white px-10 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#0077ed] transition-all shadow-lg cursor-pointer"
          >
            Learn more
          </button>
          <button 
            onClick={() => window.open('https://www.apple.com/in/shop/buy-iphone/iphone-17e', '_blank')}
            className="oneshot-btn border-2 border-[#0071e3] text-[#0071e3] px-10 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#0071e3] hover:text-white transition-all cursor-pointer"
          >
            Pre-order
          </button>
        </div>
      </div>

     
      <div className="relative w-full max-w-212.5 z-10 perspective-[1000px]">
        <img 
          ref={imageRef}
          src={iph} 
          alt="iPhone 17e" 
          className="w-full h-auto object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
        />
      </div>

    </section>
  )
}

export default IPhoneOneShot;