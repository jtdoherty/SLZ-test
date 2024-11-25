import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EvBets from './pages/EvBets';
import Arbitrage from './pages/Arbitrage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a1f2e] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ev-bets" element={<EvBets />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
        </Routes>

        <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2024 SportsLogicZone. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      </div>
    </BrowserRouter>
  );
}

export default App;