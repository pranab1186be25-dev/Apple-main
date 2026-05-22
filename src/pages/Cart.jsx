import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ChevronRight, ArrowLeft, ShoppingBag, ShieldCheck, Truck } from 'lucide-react'

// Mere components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Cart = ({ cart, setCart }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();


  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; 
  const total = subtotal + tax;


  const removeItem = (id) => {
    const itemElement = document.querySelector(`#item-${id}`);
    if (itemElement) {
      gsap.to(itemElement, {
        x: -50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => {
          setCart(prev => prev.filter(item => item.id !== id));
        }
      });
    } else {
      setCart(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });


      tl.from(".cart-header h1", { 
          y: 40, 
          opacity: 0, 
          duration: 1.2, 
          skewY: 2 
      });


      if (document.querySelectorAll(".cart-item").length > 0) {
        tl.from(".cart-item", { 
          y: 60, 
          opacity: 0, 
          stagger: 0.15, 
          duration: 1, 
          scale: 0.95,
          clearProps: "all" 
        }, "-=0.8");
      }


      if (document.querySelector(".summary-card")) {
        tl.from(".summary-card", { 
          x: 100, 
          opacity: 0, 
          duration: 1.2 
        }, "-=1");
      }

      tl.from(".trust-badge", { 
        y: 20, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.8 
      }, "-=0.5");

    }, containerRef);
    
    return () => ctx.revert();
  }, [cart.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] font-sans selection:bg-blue-100">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <main ref={containerRef} className="grow pt-32 pb-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          
          
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-[#0066cc] mb-12 group cursor-pointer font-medium hover:underline"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-300" /> 
            Continue Shopping
          </button>

          <div className="cart-header mb-16 overflow-hidden">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f]">
              Review your bag.
            </h1>
            <div className="flex gap-6 mt-4">
               <div className="trust-badge flex items-center gap-2 text-zinc-500 text-sm font-medium">
                  <Truck size={16} /> Free Shipping
               </div>
               <div className="trust-badge flex items-center gap-2 text-zinc-500 text-sm font-medium">
                  <ShieldCheck size={16} /> 1-Year Warranty
               </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
           
            <div className="flex-1 space-y-8">
              {cart.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-zinc-100">
                  <ShoppingBag size={80} className="mx-auto text-zinc-100 mb-6" />
                  <h2 className="text-3xl font-bold text-zinc-300 tracking-tight">Your bag is empty.</h2>
                  <button 
                    onClick={() => navigate('/')} 
                    className="mt-8 bg-[#0071e3] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0077ed] transition-all cursor-pointer active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.id} 
                    id={`item-${item.id}`}
                    className="cart-item group flex flex-col md:flex-row items-center gap-10 bg-white p-10 rounded-[3rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700"
                  >
                  
                    <div className="w-48 h-48 shrink-0 bg-[#f5f5f7] rounded-4xl p-6 group-hover:scale-105 transition-transform duration-500">
                      <img src={item.imgTop} className="w-full h-full object-contain drop-shadow-xl" alt={item.name} />
                    </div>

                    
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">{item.name}</h3>
                      <p className="text-zinc-400 font-medium mt-2">{item.tag || "Apple Premium Product"}</p>
                      
                      <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                        <div className="flex items-center gap-8 border border-zinc-100 px-6 py-3 rounded-2xl bg-zinc-50/50">
                          <button onClick={() => updateQty(item.id, -1)} className="cursor-pointer text-zinc-400 hover:text-black transition-colors">
                            <Minus size={18}/>
                          </button>
                          <span className="font-bold text-xl min-w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="cursor-pointer text-zinc-400 hover:text-black transition-colors">
                            <Plus size={18}/>
                          </button>
                        </div>
                      </div>
                    </div>

                   
                    <div className="flex flex-col items-center md:items-end justify-between min-h-35">
                      <p className="text-3xl font-bold text-[#1d1d1f]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-red-500 text-sm font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

           
            {cart.length > 0 && (
              <div className="summary-card w-full lg:w-110">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-white sticky top-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                  
                  <h2 className="text-2xl font-bold mb-10 text-[#1d1d1f] relative">Bag Summary</h2>
                  
                  <div className="space-y-5 font-medium text-[#1d1d1f] border-b border-zinc-100 pb-10 relative">
                    <div className="flex justify-between text-lg">
                      <span className="text-zinc-400">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-zinc-400">Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-zinc-400">Estimated Tax</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between text-4xl font-bold text-[#1d1d1f] mb-12 relative">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>

                  <button 
                    onClick={() => window.open("https://www.apple.com/in/store", "_blank")}
                    className="w-full bg-[#0071e3] text-white py-6 rounded-2xl font-bold hover:bg-[#0077ed] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-[0_20px_40px_rgba(0,113,227,0.3)] active:scale-95 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Checkout on official Apple Store</span>
                    <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform relative z-10" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Cart