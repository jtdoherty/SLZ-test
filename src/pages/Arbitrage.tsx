import React, { useState } from 'react';
import { RefreshCw, Filter, Percent } from 'lucide-react';

export default function Arbitrage() {
  const [preGame, setPreGame] = useState(true);
  const [live, setLive] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Arbitrage Finder</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find guaranteed profit opportunities by comparing odds across different sportsbooks.
          Our tool updates in real-time to help you spot and act on arbitrage opportunities.
        </p>
      </div>

      <div className="bg-[#0f1219] rounded-lg shadow-xl p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setPreGame(!preGame)}
            className={`px-4 py-2 rounded-md ${
              preGame ? 'bg-indigo-600 text-white' : 'bg-[#1a1f2e] text-gray-400'
            }`}
          >
            Pre-Game ({0})
          </button>
          <button
            onClick={() => setLive(!live)}
            className={`px-4 py-2 rounded-md ${
              live ? 'bg-indigo-600 text-white' : 'bg-[#1a1f2e] text-gray-400'
            }`}
          >
            Live ({0})
          </button>
          <div className="flex-grow"></div>
          <select className="bg-[#1a1f2e] border border-gray-700 rounded-md px-4 py-2 text-white">
            <option value="all">All Sports</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Hockey">Hockey</option>
            <option value="Soccer">Soccer</option>
            <option value="Tennis">Tennis</option>
          </select>

        </div>
      </div>

      <div className="bg-[#0f1219] rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400">
          <div>EVENT</div>
          <div>BET 1</div>
          <div>BET 2</div>
          <div>ROI</div>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-400 py-12">
            <p>No arbitrage opportunities found. Check back later!</p>
          </div>
        </div>
      </div>
        <div className="mb-12"></div>
      <div className="bg-[#0f1219] rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-center text-2xl font-bold mb-6">Arbitrage Betting Tool: Quick Guide</h2>
        
        <h3 className='text-xl font-semibold mb-3'>What is Arbitrage Betting?</h3>
        <p className="text-gray-400 mb-4">
          Arbitrage betting ("arbing") is a strategy that guarantees profit by simultaneously betting on all possible outcomes of an event at different sportsbooks when their odds create a profitable opportunity.
        </p>
        
        <h3 className='text-xl font-semibold mb-3'>How Our Tool Works</h3>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          <li>Real-time Monitoring: Scans sportsbook odds every minute</li>
          <li>Automatic Detection: Identifies when combined odds create profit opportunities</li>
          <li>Live Updates: Shows both pre-game and live betting opportunities</li>
          <li>Comprehensive Coverage: Monitors major leagues in football, basketball, baseball, hockey, soccer, and more</li>
        </ul>
        
        <h3 className='text-xl font-semibold mb-3'>How to Use</h3>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          <li>Monitor the displayed opportunities</li>
          <li>Use the calculator to determine optimal bet amounts</li>
          <li>Place both bets quickly before odds change</li>
          <li>Profit is guaranteed regardless of outcome</li>
        </ul>
        
        <h3 className='text-xl font-semibold mb-3'>Pro Tips</h3>
        <ul className="list-disc list-inside text-gray-400 mb-4">
          <li>Act fast as opportunities can disappear quickly</li>
          <li>Use multiple sportsbook accounts</li>
          <li>Consider odds boosts and free bets for additional opportunities</li>
          <li>Monitor line movements for potential arbitrage situations</li>
        </ul>
      </div>
    </div>
  );
}