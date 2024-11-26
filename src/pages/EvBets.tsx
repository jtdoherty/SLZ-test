import React, { useState, useEffect } from 'react';
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

interface Bet {
  key: string;
  edge: string;
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
  participant: string;
  profit_potential: number;
}

const fetchArbitrageData = async () => {
  try {
    console.log('Fetching arbitrage data...');
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error loading arbitrage data:', error);
    return [];
  }
};

export default function EvBets() {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('moneyline');
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchArbitrageData();
        console.log('Setting bets:', data);
        setBets(data);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Log the current state of bets
  useEffect(() => {
    console.log('Current bets:', bets);
  }, [bets]);

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
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400">
          <div>EVENT</div>
          <div>+EV BET</div>
          <div>CONSENSUS IMPLIED PROBABILITY</div>
          <div>+EV BET ODDS</div>
          <div>ROI</div>
        </div>
        <div className="divide-y divide-gray-800">
          {loading ? (
            <div className="text-center text-gray-400 py-12">
              <p>Loading betting opportunities...</p>
            </div>
          ) : bets.length > 0 ? (
            bets.map((bet) => (
              <div key={bet.key} className="grid grid-cols-5 gap-4 p-4 text-sm">
                <div className="text-white">
                  <div>{bet.market_name}</div>
                  <div className="text-xs text-gray-400">{bet.competition_instance_name}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(bet.event_start_time).toLocaleString()}
                  </div>
                </div>
                <div className="text-white">
                  {bet.participant || 'N/A'}
                  <div className="text-xs text-gray-400">{bet.source}</div>
                </div>
                <div className="text-white text-center">
                  {(bet.implied_probability).toFixed(2)}%
                </div>
                <div className="text-white text-center">
                  {bet.outcome_payout}
                </div>
                <div className="text-emerald-400 text-center">
                  +{(bet.EV).toFixed(2)}%
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No betting opportunities found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}