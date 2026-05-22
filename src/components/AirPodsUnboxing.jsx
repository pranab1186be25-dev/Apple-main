import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Assets
import pod1 from '../assets/pod1.png' 
import pod2 from '../assets/pod2.png'
import pod3 from '../assets/pod3.png'

gsap.registerPlugin(ScrollTrigger);

const AirPodsUnboxing = ({ cart, setCart }) => {
  const containerRef = useRef(null);
  const mainImageRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const airpods = [
    { id: "air-pro", name: "AirPods Pro", tag: "Magic remastered", price: 249, img: pod1 },
    { id: "air-max", name: "AirPods Max", tag: "Pure harmony", price: 549, img: pod2 },
    { id: "air-4", name: "AirPods 4", tag: "Iconic. Evolved.", price: 179, img: pod3 },
  ];

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imgTop: product.img,
      tag: product.tag,
      quantity: 1
    };

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === cartItem.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, cartItem];
    });

    navigate('/cart');
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out", duration: 0.5 } 
      });

      tl.fromTo(mainImageRef.current, 
          { scale: 3, opacity: 0, filter: "blur(15px)" }, 
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8 }
        )
        .fromTo(textRef.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0 }, 
          "-=0.6"
        )
        .to([mainImageRef.current, textRef.current], { 
          y: -80, 
          opacity: 0, 
          scale: 0.9,
          duration: 0.4,
          delay: 0.5 
        })
        .fromTo(titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 }
        )
        .fromTo(".airpod-card", 
          { scale: 0.8, opacity: 0, y: 50 },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            stagger: 0.05, 
            duration: 0.6, 
            ease: "back.out(1.2)" 
          },
          "-=0.3"
        );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        onEnter: () => tl.play(),
        once: true 
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center py-20 font-sans">
      
      {/* Hero Animation Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6">
        <img 
          ref={mainImageRef} 
          src={pod1} 
          className="w-70 md:w-100 h-auto object-contain drop-shadow-2xl" 
          alt="AirPods Hero"
        />
        
        <div ref={textRef} className="text-center mt-6 max-w-xl">
          <h3 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-2 leading-none">
            Magic like you’ve <br/> never heard.
          </h3>
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Personalized Spatial Audio.</p>
        </div>
      </div>

      {/* Product Cards Layer */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-6">
        
        <h2 ref={titleRef} className="text-3xl md:text-5xl font-black text-black tracking-tighter mb-10 opacity-0 italic">
          Our Top AirPods
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {airpods.map((item, i) => (
            <div 
              key={i} 
              className="airpod-card w-70 md:w-[320px] h-120 bg-[#fbfbfd] rounded-[3rem] p-8 flex flex-col justify-between border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">{item.tag}</p>
                <h4 className="text-2xl font-black text-black tracking-tight">{item.name}</h4>
              </div>

              <div className="flex-1 flex items-center justify-center py-4">
                <img 
                  src={item.img} 
                  className="max-h-45 w-auto object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700" 
                  alt={item.name} 
                />
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-3xl font-black text-black italic">${item.price}</span>
                </div>
                
                <div className="w-full">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-xl cursor-pointer"
                  >
                    <ShoppingBag size={16} /> Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AirPodsUnboxing;