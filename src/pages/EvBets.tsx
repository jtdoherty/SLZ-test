import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import Card from '../components/Card';
import FilterSelect from '../components/FilterSelect';

const sportOptions = [
  { value: 'all', label: 'All Sports' },
  { value: 'nfl', label: 'NFL' },
  { value: 'nba', label: 'NBA' },
  { value: 'mlb', label: 'MLB' },
  { value: 'nhl', label: 'NHL' },
];

const marketOptions = [
  { value: 'moneyline', label: 'Moneyline' },
  { value: 'spread', label: 'Spread' },
  { value: 'totals', label: 'Totals' },
  { value: 'props', label: 'Player Props' },
];

export default function EvBets() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('moneyline');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">+EV Bet Finder</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find positive expected value bets across multiple sportsbooks. Our algorithm compares odds
          and identifies opportunities where the true probability exceeds the implied probability.
        </p>
      </div>

      <div className="bg-[#0f1219] rounded-lg shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FilterSelect
            label="Sport"
            value={selectedSport}
            onChange={setSelectedSport}
            options={sportOptions}
          />
          <FilterSelect
            label="Market"
            value={selectedMarket}
            onChange={setSelectedMarket}
            options={marketOptions}
          />
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Min. Edge %</label>
            <input
              type="number"
              min="0"
              max="100"
              defaultValue="2"
              className="w-full bg-[#1a1f2e] border border-gray-700 rounded-md px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card
          icon={Calculator}
          title="Edge Calculator"
          description="Calculate the exact edge percentage for any bet using our advanced probability model."
        />
        <Card
          icon={TrendingUp}
          title="Live Tracking"
          description="Monitor line movements and odds changes in real-time across all major sportsbooks."
        />
        <Card
          icon={DollarSign}
          title="Profit Calculator"
          description="Determine optimal bet sizes and calculate potential returns based on your bankroll."
        />
      </div>

      <div className="bg-[#0f1219] rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold">Current +EV Opportunities</h3>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-400 py-12">
            <p>Select filters above to view available +EV betting opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}