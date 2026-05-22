import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import appleLogo from '../assets/apple.png' 
import macVideo from '../assets/mac_video.mp4'
import mac from '../assets/mac.png' 
import iph from '../assets/iph.png' 

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const introLogoRef = useRef(null)
  const iphoneSectionRef = useRef(null)
  const macSectionRef = useRef(null)
  const heroImageRef = useRef(null)
  const videoContainerRef = useRef(null)
  const iphImageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });


    gsap.set([heroImageRef.current, videoContainerRef.current], { opacity: 0, scale: 0.9 });
    gsap.set(".mac-fly-text", { opacity: 0, scale: 0, filter: "blur(20px)" });
    gsap.set(iphoneSectionRef.current, { display: 'none', opacity: 0 });


    tl.fromTo(introLogoRef.current, 
      { opacity: 0, scale: 0.5, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" }
    )
    .to(introLogoRef.current, { scale: 1.1, duration: 1 }) 
    .to(introLogoRef.current, { opacity: 0, scale: 1.5, duration: 0.8 });


    tl.set(iphoneSectionRef.current, { display: 'flex' })
    .to(iphoneSectionRef.current, { opacity: 1, duration: 0.6 })
    .fromTo([".oneshot-text", ".oneshot-btn"], 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, 
      "-=0.4"
    )
    .fromTo(iphImageRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.8"
    )

    
    .to({}, { duration: 0.5 })
    .to(iphoneSectionRef.current, { 
      y: "100%", 
      opacity: 0, 
      duration: 1.2, 
      ease: "power4.inOut" 
    })
    
    .to([heroImageRef.current, videoContainerRef.current], { 
      opacity: 1, 
      scale: 1, 
      duration: 1 
    }, "-=0.6")
    .to(".mac-fly-text", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      stagger: { amount: 0.5, from: "center" },
      duration: 1.2,
      ease: "elastic.out(1, 0.8)"
    }, "-=0.8")
    
    
    .to(heroImageRef.current, { opacity: 0, duration: 0.8, delay: 0.5 });

 
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;
      if(iphImageRef.current) {
        gsap.to(iphImageRef.current, { rotateY: xPos, rotateX: -yPos, duration: 0.6 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-white">
      
      
      <div ref={introLogoRef} className="fixed inset-0 flex items-center justify-center z-100 pointer-events-none">
        <img src={appleLogo} alt="Logo" className="h-16 md:h-20 w-auto brightness-0" />
      </div>

      
      <section ref={iphoneSectionRef} className="fixed inset-0 w-full h-screen bg-[#fbfbfd] flex flex-col items-center justify-center z-50">
        <div className="text-center mb-8">
          <h1 className="oneshot-text text-5xl md:text-8xl font-black text-black tracking-tighter">iPhone 17e</h1>
          <p className="oneshot-text text-xl md:text-2xl text-zinc-500 font-medium mt-2">Feature stacked. Value packed.</p>
          <div className="flex gap-4 mt-8 justify-center">
            <button onClick={() => window.open('https://www.apple.com/in/iphone-17e/', '_blank')} className="oneshot-btn bg-[#0071e3] text-white px-8 py-3 rounded-full font-bold cursor-pointer">Learn more</button>
            <button onClick={() => window.open('https://www.apple.com/in/shop/buy-iphone/iphone-17e', '_blank')} className="oneshot-btn border-2 border-[#0071e3] text-[#0071e3] px-8 py-3 rounded-full font-bold cursor-pointer">Pre-order</button>
          </div>
        </div>
        <img ref={iphImageRef} src={iph} alt="iPhone" className="w-full max-w-150 h-auto object-contain drop-shadow-2xl" />
      </section>

     
      <section ref={macSectionRef} className="relative w-full h-screen flex items-center px-6 md:px-14 z-10">
        <div className="flex flex-col md:flex-row w-full max-w-360 mx-auto items-center">
          
          <div className="relative w-full md:w-1/2 h-[50vh] md:h-[65vh] flex items-center justify-center perspective-[1500px] order-1">
            <div ref={heroImageRef} className="absolute inset-0 flex items-center justify-center z-20">
              <img src={mac} alt="Mac" className="w-[88%] h-auto object-contain drop-shadow-2xl" />
            </div>
            <div ref={videoContainerRef} className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-[82%] aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/20">
                <video src={macVideo} autoPlay muted loop playsInline className="w-full h-full object-cover scale-105" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left order-2">
            <div className="mac-fly-text mb-6">
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]">Intelligence Built-In</span>
            </div>
            <h1 className="mac-fly-text text-6xl lg:text-[100px] font-black text-[#1d1d1f] tracking-tighter leading-[0.9] mb-8">
              MacBook <br /> <span className="text-zinc-300">Neo.</span>
            </h1>
            <div className="mac-fly-text flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
              <button className="bg-[#0071e3] text-white px-12 py-4 rounded-full font-bold cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">Pre-order</button>
              <button className="text-[#0071e3] font-bold text-[17px] cursor-pointer">Learn more →</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hero;