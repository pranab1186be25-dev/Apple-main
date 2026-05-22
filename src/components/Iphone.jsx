import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'

// Assets
import appleLogo from '../assets/apple.png' 
import iphoneFront from '../assets/iphone_front.png'
import iphoneBack from '../assets/iphone_back.png' 

gsap.registerPlugin(ScrollTrigger);

const IPhone = ({ cart, setCart }) => {
  const triggerRef = useRef(null);
  const mainPhoneRef = useRef(null);
  const leftPhoneRef = useRef(null);
  const rightPhoneRef = useRef(null);
  const bgLogoRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  const addToCart = () => {
    const product = {
      id: "iphone-17-pro",
      name: "iPhone 17 Pro",
      price: 1199,
      imgTop: iphoneFront,
      tag: "Titanium. Strong. Light. Pro."
    };

    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert("Added to bag!");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 1.5 }
      });

      tl.fromTo(bgLogoRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 0.05 }, 0)
        .fromTo(headerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0.3)
        .fromTo(mainPhoneRef.current, { y: "100%", opacity: 0, scale: 0.8 }, { y: "5%", opacity: 1, scale: 1 }, 0.5)
        .fromTo(leftPhoneRef.current, { x: "0%", opacity: 0, rotation: -20 }, { x: "-75%", opacity: 0.4, rotation: -10 }, 0.8)
        .fromTo(rightPhoneRef.current, { x: "0%", opacity: 0, rotation: 20 }, { x: "75%", opacity: 0.4, rotation: 10 }, 0.8)
        .fromTo(footerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 1.2);

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 70%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative bg-white w-full h-screen overflow-hidden">
      <section className="relative w-full h-full flex flex-col items-center justify-between py-12">
        <div ref={bgLogoRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src={appleLogo} className="w-[70%] h-auto opacity-5 grayscale" alt="Logo" />
        </div>
        <div ref={headerRef} className="z-10 text-center px-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-tight">
            iPhone 17 <span className="text-[#0071e3]">Pro.</span>
          </h2>
        </div>
        <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center pointer-events-none">
          <div ref={leftPhoneRef} className="absolute z-1 w-[40%] md:w-[32%]"><img src={iphoneBack} alt="Back" /></div>
          <div ref={rightPhoneRef} className="absolute z-1 w-[40%] md:w-[32%]"><img src={iphoneBack} alt="Back" /></div>
          <div ref={mainPhoneRef} className="relative z-2 w-[55%] md:w-[42%]"><img src={iphoneFront} alt="Front" /></div>
        </div>
        <div ref={footerRef} className="z-20 flex flex-col items-center gap-6 pb-6">
          <span className="text-4xl font-black italic text-black">$1,199</span>
          <button onClick={addToCart} className="flex items-center gap-2 bg-black text-white px-16 py-4 rounded-full font-black text-xs hover:scale-105 transition-all cursor-pointer active:scale-95 shadow-2xl">
            <ShoppingBag size={18} /> Add to Bag
          </button>
        </div>
      </section>
    </div>
  )
}

export default IPhone;