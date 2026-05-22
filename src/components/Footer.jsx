import React from 'react'
import { Instagram, Twitter, Github, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1d1d1f] text-[#f5f5f7] pt-16 pb-8 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Shop and Learn</h4>
            <a href="#" className="text-sm hover:underline transition-all">Store</a>
            <a href="#" className="text-sm hover:underline transition-all">Mac</a>
            <a href="#" className="text-sm hover:underline transition-all">iPad</a>
            <a href="#" className="text-sm hover:underline transition-all">iPhone</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Entertainment</h4>
            <a href="#" className="text-sm hover:underline transition-all">Apple Music</a>
            <a href="#" className="text-sm hover:underline transition-all">Apple TV+</a>
            <a href="#" className="text-sm hover:underline transition-all">Apple Arcade</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Support</h4>
            <a href="#" className="text-sm hover:underline transition-all">Apple Support</a>
            <a href="#" className="text-sm hover:underline transition-all">Community</a>
            <a href="#" className="text-sm hover:underline transition-all">Check Service Status</a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Follow Us</h4>
            <div className="flex gap-4 mt-1">
              <Instagram size={18} className="cursor-pointer hover:text-blue-500 transition-colors" />
              <Twitter size={18} className="cursor-pointer hover:text-blue-400 transition-colors" />
              <Github size={18} className="cursor-pointer hover:text-white transition-colors" />
              <Globe size={18} className="cursor-pointer hover:text-green-400 transition-colors" />
            </div>
          </div>
        </div>

       
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[12px] text-zinc-500">
            Copyright © {currentYear} iPhone Clone Project. All rights reserved. 
            <span className="hidden md:inline mx-2 text-zinc-700">|</span>
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="mx-2 text-zinc-700">|</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Use</span>
          </div>
          
          <div className="text-[12px] text-zinc-500 flex items-center gap-1">
            <span className="font-bold text-zinc-400 italic">Made with ❤️ for LinkedIn</span>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer