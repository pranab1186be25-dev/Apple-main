import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger);

const IPadAdvance = ({ cart, setCart }) => {
  const sectionRef = useRef(null);
  const ipadRef = useRef(null);
  const pencilRef = useRef(null);
  const navigate = useNavigate();

  const ipadData = {
    id: "ipad-air-m2",
    name: "iPad Air",
    price: 59900,
    displayPrice: "$599",
    img: "https://m.media-amazon.com/images/I/61goypdjAYL.jpg",
    tag: "Freshly Squeezed."
  };

  const handleAddToCart = () => {
    const product = {
      id: ipadData.id,
      name: ipadData.name,
      price: ipadData.price,
      imgTop: ipadData.img,
      tag: ipadData.tag,
      quantity: 1
    };

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, product];
    });

    navigate('/cart');
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      tl.from(ipadRef.current, { scale: 1.1, opacity: 0, duration: 1 })
        .from(".flow-item", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.5")
        .from(pencilRef.current, { x: 100, opacity: 0, duration: 0.8 }, "-=0.8");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[70vh] bg-white flex flex-col items-center justify-center py-10 px-6 overflow-hidden">
      
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-zinc-50 select-none pointer-events-none z-0">
        AIR
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl w-full">
        
        {/* Visual Container - Chota Size */}
        <div className="relative w-full max-w-[320px] md:max-w-100">
          <div ref={pencilRef} className="absolute -top-4 -right-8 w-24 md:w-32 z-30">
            <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MUWA3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1696531238491" alt="Pencil" className="w-full h-auto drop-shadow-lg" />
          </div>
          <div ref={ipadRef} className="z-20 shadow-2xl rounded-2xl overflow-hidden border border-zinc-100">
            <img src={ipadData.img} alt="iPad" className="w-full h-auto" />
          </div>
        </div>

        {/* Info & Button */}
        <div className="text-center space-y-4">
          <div className="flow-item">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black">{ipadData.name}</h2>
            <p className="text-zinc-500 font-medium text-sm">M2 Chip. Incredibly thin.</p>
          </div>

          <div className="flow-item">
            <p className="text-2xl font-bold text-black mb-4">{ipadData.displayPrice}</p>
            <button 
              onClick={handleAddToCart}
              className="bg-[#0071e3] text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-[#0077ed] transition-all active:scale-95 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default IPadAdvance;