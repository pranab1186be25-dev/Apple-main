import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Navbar from './components/Navbar'
import Footer from './components/Footer'


import Hero from './components/Hero'
import IPhoneHero from './components/IPhoneHero'
import MacLineup from './components/MacLineup'
import IPhone from './components/Iphone' 
import IPhoneCards from './components/IphoneCard'
import AirPodsUnboxing from './components/AirPodsUnboxing'
import WatchSection from './components/Watch'
import IPadSection from './components/ipad' 
import Cart from './pages/Cart'

const App = () => {
  const [cart, setCart] = useState([]);


  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="bg-white min-h-screen">
            <Navbar cartCount={totalItems} /> 
            
            <div id="hero"><Hero /></div>
            
            <div id="iphone-hero">
              <IPhoneHero cart={cart} setCart={setCart} />
            </div>

            <div id="mac">
              <MacLineup cart={cart} setCart={setCart} />
            </div>

            <div id="iphone">
              <IPhone cart={cart} setCart={setCart} />
              <IPhoneCards cart={cart} setCart={setCart} /> 
            </div>

            <div id="airpods">
              <AirPodsUnboxing cart={cart} setCart={setCart} />
            </div>

            <div id="watch">
              <WatchSection cart={cart} setCart={setCart} />
            </div>

            <div id="ipad">
              <IPadSection cart={cart} setCart={setCart} />
            </div>
            
            <Footer />
          </div>
        } />
        
        {/* Cart Page Route */}
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        
      </Routes>
    </Router>
  )
}

export default App