import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger);

import mac1 from '../assets/mac1.png'; import mac1_2 from '../assets/mac1.2.png';
import mac2 from '../assets/mac2.png'; import mac2_2 from '../assets/mac2.2.png';
import mac3 from '../assets/mac3.png'; import mac3_2 from '../assets/mac3.2.png';

const MacLineup = ({ cart, setCart }) => {
  const containerRef = useRef(null);

  const macData = [
    { 
      id: "mac-air-13",
      name: "MacBook Air 13”",
      title: "Strikingly thin. Fast as M4.", 
      desc: "The world’s most popular laptop is even better with the M4 chip.",
      price: 1099, 
      imgTop: mac1, 
      imgBottom: mac1_2,
      accent: "text-blue-500",
      tag: "Supercharged by M4"
    },
    { 
      id: "mac-air-15",
      name: "MacBook Air 15”",
      title: "Big screen. Slim profile.", 
      desc: "Get more room for everything you love with the expansive display.",
      price: 1299,
      imgTop: mac2, 
      imgBottom: mac2_2,
      accent: "text-purple-600",
      tag: "More Room to Bloom"
    },
    { 
      id: "mac-pro-14",
      name: "MacBook Pro 14”",
      title: "A creative powerhouse.", 
      desc: "With the M4 Pro or M4 Max chip, this Pro is built for those who push limits.",
      price: 1599,
      imgTop: mac3, 
      imgBottom: mac3_2,
      accent: "text-red-600",
      tag: "Mind-blowing. Head-turning."
    }
  ];

  const addToCart = (product) => {
    console.log("Adding to cart:", product.name);
    if (!setCart) {
      alert("Error: setCart function missing! Check App.js props.");
      return;
    }
    
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to bag!`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".mac-section");
      sections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
          }
        });
        tl.fromTo(section.querySelector(".mac-main-img"), { y: 150, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 2 })
          .fromTo(section.querySelector(".mac-sub-img"), { y: 300, opacity: 0 }, { y: 50, opacity: 0.4, duration: 2 }, "-=1.5")
          .fromTo(section.querySelector(".copy-text"), { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1.8");
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white">
      {macData.map((item, index) => (
        <section key={index} className="mac-section h-screen w-full flex flex-col md:flex-row items-center justify-between px-10 md:px-24 sticky top-0 bg-white overflow-hidden border-b border-gray-50">
          <div className="copy-text w-full md:w-1/2 z-30">
            <div className="mb-4">
               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{item.tag}</span>
               <h1 className="text-3xl md:text-4xl font-bold text-black mt-1">{item.name}</h1>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-black mb-6">
              <span className={item.accent}>{item.title}</span>
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl font-medium max-w-lg mb-10 leading-snug">{item.desc}</p>
            <div className="flex flex-col gap-6">
              <span className="text-3xl font-bold tracking-tight text-black italic">From ${item.price}</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(item)}
                  className="flex items-center gap-2 border-2 border-black text-black px-12 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag size={20} /> Add to Bag
                </button>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
            <div className="mac-main-img w-[110%] z-20">
              <img src={item.imgTop} alt={item.name} className="w-full h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]" />
            </div>
            <div className="mac-sub-img absolute bottom-0 right-0 w-full z-10 opacity-30 blur-[1px]">
              <img src={item.imgBottom} alt={item.name} className="w-full h-auto object-contain" />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
export default MacLineup;