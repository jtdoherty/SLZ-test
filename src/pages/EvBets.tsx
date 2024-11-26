'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import Card from '../components/Card';
import FilterSelect from '../components/FilterSelect';

interface Bet {
  market_name: string;
  competition_instance_name: string;
  event_start_time: string;
  sport: string;
  participants: string[];
  type: string;
  source: string;
  implied_probability: number;
  outcome_payout: number;
  EV: number;
  lastFoundAt: string;
}

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
  const [minEdge, setMinEdge] = useState(2);
  const [bets, setBets] = useState<Bet[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchArbitrageData = async () => {
    try {
      const response = await fetch('/output7.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading arbitrage data:', error);
      return [];
    }
  };

  const filterAndSortBets = (bets: Bet[]) => {
    const currentDate = new Date();
    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    return bets
      .filter((bet) => {
        const eventDate = new Date(bet.event_start_time);
        const matchesSport = selectedSport === 'all' || bet.sport.toLowerCase() === selectedSport;
        const matchesMarket = selectedMarket === 'all' || bet.type.toLowerCase().includes(selectedMarket);
        const meetsEdge = bet.EV >= minEdge;
        return eventDate >= currentDate && 
               eventDate <= sevenDaysFromNow && 
               matchesSport && 
               matchesMarket && 
               meetsEdge;
      })
      .sort((a, b) => b.EV - a.EV);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchArbitrageData();
      const filteredData = filterAndSortBets(data);
      setBets(filteredData);
      
      if (filteredData.length > 0) {
        setLastUpdate(new Date(filteredData[0].lastFoundAt).toLocaleString());
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedSport, selectedMarket, minEdge]);

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
              value={minEdge}
              onChange={(e) => setMinEdge(Number(e.target.value))}
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
          {lastUpdate && (
            <div className="text-sm text-gray-400">
              Last Updated: {lastUpdate}
            </div>
          )}
        </div>
        <div className="p-6">
          {bets.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>No betting opportunities found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#1a1f2e] text-gray-400">
                    <th className="px-4 py-2 text-left">Event</th>
                    <th className="px-4 py-2 text-left">Details</th>
                    <th className="px-4 py-2 text-center">Probability</th>
                    <th className="px-4 py-2 text-center">Payout</th>
                    <th className="px-4 py-2 text-center">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-[#1a1f2e]">
                      <td className="px-4 py-4">
                        <div className="font-bold text-white">{bet.market_name}</div>
                        <div className="text-sm text-gray-400">{bet.competition_instance_name}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(bet.event_start_time).toLocaleString('en-US', {
                            weekday: 'long',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            timeZone: 'America/New_York',
                            month: 'short',
                            day: 'numeric'
                          })} ET
                        </div>
                        <div className="text-sm text-gray-400">{bet.sport}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-white">{bet.participants[0]}</div>
                        <div className="text-sm text-gray-400">{bet.type}</div>
                        <div className="text-sm text-gray-400">{bet.source}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="font-bold text-white">{bet.implied_probability.toFixed(2)}%</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="font-bold text-white">{bet.outcome_payout}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="font-bold text-green-500">{bet.EV.toFixed(2)}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}