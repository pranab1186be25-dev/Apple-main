import React, { useState } from 'react'
import appleLogo from '../assets/apple.png' 
import { Search, ShoppingBag, Menu, X } from 'lucide-react' 
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openExternal = (url) => {
    setIsOpen(false);
    window.open(url, '_blank');
  };

  return (
    <nav className="w-full bg-[#f5f5f7]/95 backdrop-blur-md sticky top-0 z-9999 h-11 flex items-center border-b border-zinc-200/50">
      {/* Container: justify-center use kiya hai taaki sab pass aa jayein */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between md:justify-center px-4 md:px-0">
        
        {/* Mobile Menu (Only visible on small screens) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-800 cursor-pointer">
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

     
        <div className="flex items-center space-x-6 lg:space-x-10">
          
          
          <Link to="/" className="hover:opacity-60 transition-opacity flex items-center">
            <img src={appleLogo} alt="Apple" className="h-4 w-auto brightness-0" />
          </Link>

          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 text-[12px] text-zinc-800/90 tracking-tight">
            <button onClick={() => handleScroll('hero')} className="hover:text-black cursor-pointer transition-colors">Store</button>
            <button onClick={() => handleScroll('mac')} className="hover:text-black cursor-pointer transition-colors">Mac</button>
            <button onClick={() => handleScroll('ipad')} className="hover:text-black cursor-pointer transition-colors">iPad</button>
            <button onClick={() => handleScroll('iphone')} className="hover:text-black cursor-pointer transition-colors">iPhone</button>
            <button onClick={() => handleScroll('watch')} className="hover:text-black cursor-pointer transition-colors">Watch</button>
            <button onClick={() => handleScroll('airpods')} className="hover:text-black cursor-pointer transition-colors">AirPods</button>
            <button onClick={() => openExternal('https://www.apple.com/in/shop/accessories/all')} className="hover:text-black cursor-pointer transition-colors">Accessories</button>
            <button onClick={() => openExternal('https://support.apple.com/en-in')} className="hover:text-black cursor-pointer transition-colors">Support</button>
          </div>

      
          <button className="hover:opacity-60 transition-opacity cursor-pointer text-zinc-800/90">
            <Search size={15} />
          </button>

         
          <Link to="/cart" className="relative hover:opacity-60 transition-opacity text-zinc-800/90">
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span className="absolute -bottom-1 -right-1.5 bg-black text-white text-[8px] font-bold rounded-full h-3 w-3 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
        

      </div>

    
      <div className={`md:hidden absolute top-11 left-0 w-full bg-[#f5f5f7] transition-all duration-300 overflow-hidden ${isOpen ? 'h-screen opacity-100' : 'h-0 opacity-0'}`}>
        <div className="flex flex-col p-10 space-y-6 text-xl font-medium text-zinc-800">
          <button onClick={() => handleScroll('hero')} className="text-left border-b border-zinc-200 pb-2">Store</button>
          <button onClick={() => openExternal('https://www.apple.com/in/shop/accessories/all')} className="text-left border-b border-zinc-200 pb-2">Accessories</button>
          <button onClick={() => openExternal('https://support.apple.com/en-in')} className="text-left border-b border-zinc-200 pb-2">Support</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar