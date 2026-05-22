import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'


import w1 from '../assets/w1.png'
import w2 from '../assets/w2.png'
import w3 from '../assets/w3.png'

gsap.registerPlugin(ScrollTrigger);

const WatchSection = ({ cart, setCart }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const watches = [
    { id: "aw-s11", name: "Series 11", desc: "The ultimate watch.", price: 46900, displayPrice: "$399", img: w1 },
    { id: "aw-se3", name: "Watch SE 3", desc: "Essential features.", price: 25900, displayPrice: "$259", img: w2 },
    { id: "aw-u3", name: "Ultra 3", desc: "The toughest watch.", price: 89900, displayPrice: "$899", img: w3 }
  ];

  const handleAddToCart = (watch) => {
    const product = {
      id: watch.id,
      name: watch.name,
      price: watch.price,
      imgTop: watch.img,
      tag: watch.desc,
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

      gsap.fromTo(".watch-card", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-150 bg-white flex flex-col items-center py-20 px-6"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight">
          Apple Watch
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {watches.map((watch, i) => (
          <div 
            key={i} 
            className="watch-card flex flex-col items-center bg-[#f5f5f7] rounded-[2.5rem] p-8 transition-all hover:shadow-xl"
          >
            <div className="w-full aspect-square max-h-50 flex items-center justify-center mb-6">
              <img 
                src={watch.img} 
                alt={watch.name} 
                className="h-full object-contain drop-shadow-xl" 
              />
            </div>

            <div className="text-center w-full">
              <h3 className="text-2xl font-black text-[#1d1d1f] mb-1">{watch.name}</h3>
              <p className="text-zinc-500 text-sm mb-4">{watch.desc}</p>
              <p className="text-2xl font-black text-black mb-6">{watch.displayPrice}</p>

              <button 
                onClick={() => handleAddToCart(watch)}
                className="w-full flex items-center justify-center gap-2 bg-[#0071e3] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#0077ed] cursor-pointer"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WatchSection;