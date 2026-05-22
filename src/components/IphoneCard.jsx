import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom' 
import { ShoppingBag } from 'lucide-react'

// Assets
import iphone17Pro from '../assets/iphone17pro.png'
import iphoneAir from '../assets/iphoneair.png'
import iphone17 from '../assets/iphone17.png'
import iphone17e from '../assets/iphone17e.png'
import iphone16 from '../assets/iphone16.png'

gsap.registerPlugin(ScrollTrigger);

const IPhoneCards = ({ cart, setCart }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate(); 

  const devices = [
    { id: "ip-17-p", name: "iPhone 17 Pro", tag: "The Ultimate", img: iphone17Pro, grad: "from-[#f5f5f7] to-[#d2d2d7]", price: 1199 },
    { id: "ip-air", name: "iPhone Air", tag: "Thinnest Ever", img: iphoneAir, grad: "from-[#e3f2fd] to-[#bbdefb]", price: 999 },
    { id: "ip-17", name: "iPhone 17", tag: "Pure Power", img: iphone17, grad: "from-[#f9f9fb] to-[#f2f2f7]", price: 799 },
    { id: "ip-17e", name: "iPhone 17e", tag: "Essential.", img: iphone17e, grad: "from-[#fff3e0] to-[#ffe0b2]", price: 599 },
    { id: "ip-16", name: "iPhone 16", tag: "Proven.", img: iphone16, grad: "from-[#f5f5f7] to-[#e8e8ed]", price: 699 },
  ];

  // --- Add and Go to Cart Logic ---
  const handleAddToCart = (device) => {
    const product = {
      id: device.id,
      name: device.name,
      price: device.price,
      imgTop: device.img,
      tag: device.tag,
      quantity: 1
    };

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, product];
    });

   
    navigate('/cart');
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollAmount = scrollRef.current.scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#fbfbfd] h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16">
      
      <div className="px-10 md:px-24 shrink-0">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-tight">
          Which iPhone is <br />
          <span className="text-zinc-300">right for you?</span>
        </h2>
      </div>

      <div 
        ref={scrollRef} 
        className="flex flex-nowrap gap-8 px-10 md:px-24 w-max items-center h-[65vh] mt-4"
      >
        {devices.map((device, index) => (
          <div 
            key={index} 
            className={`iphone-card group shrink-0 w-75 md:w-95 h-full bg-linear-to-b ${device.grad} rounded-[3rem] p-8 md:p-10 flex flex-col justify-between border border-white shadow-lg hover:shadow-2xl transition-all duration-500`}
          >
            <div className="text-center shrink-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/30 mb-1">{device.tag}</p>
              <h3 className="text-3xl font-black text-black tracking-tight leading-none">{device.name}</h3>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-0 py-6">
              <img 
                src={device.img} 
                alt={device.name} 
                className="max-h-full w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            <div className="shrink-0 flex flex-col items-center gap-5 pt-2">
              <p className="text-2xl font-black text-black italic">${device.price}</p>
              
              <div className="w-full">
                
                <button 
                  onClick={() => handleAddToCart(device)}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-xl cursor-pointer"
                >
                  <ShoppingBag size={16} /> Add to Bag & View Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="w-[10vw] shrink-0"></div>
      </div>

      <div className="h-12 md:h-16 shrink-0"></div>

      <style>{`
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default IPhoneCards;