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
  participant: string;
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
  const [lastFoundAt, setLastFoundAt] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/backend/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const betsArray = Array.isArray(data) ? data : Object.values(data);
        setBets(betsArray);
        
        if (betsArray.length > 0) {
          setLastFoundAt(new Date(betsArray[0].lastFoundAt).toLocaleString());
        }
      } catch (error) {
        console.error('Error loading betting data:', error);
        setBets([]);
      }
    };
    fetchData();
  }, []);

  const filteredBets = React.useMemo(() => {
    const currentDate = new Date();
    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    return bets
      .filter(bet => {
        const eventDate = new Date(bet.event_start_time);
        const sportMatch = selectedSport === 'all' || bet.sport.toLowerCase() === selectedSport.toLowerCase();
        const marketMatch = selectedMarket === 'all' || bet.type.toLowerCase().includes(selectedMarket.toLowerCase());
        const dateMatch = eventDate >= currentDate && eventDate <= sevenDaysFromNow;
        const evMatch = bet.EV >= minEdge;
        
        return sportMatch && marketMatch && dateMatch && evMatch;
      })
      .sort((a, b) => b.EV - a.EV);
  }, [bets, selectedSport, selectedMarket, minEdge]);

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
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Current +EV Opportunities</h3>
          {lastFoundAt && (
            <span className="text-sm text-gray-400">Last Updated: {lastFoundAt}</span>
          )}
        </div>
        <div className="overflow-x-auto">
          {filteredBets.length > 0 ? (
            <table className="w-full">
              <thead className="bg-[#1a1f2e]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    +EV Bet
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Implied Probability
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Odds
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    EV
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredBets.map((bet, index) => (
                  <tr key={index} className="hover:bg-[#1a1f2e]">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{bet.market_name}</div>
                        <div className="text-sm text-gray-400">
                          {bet.competition_instance_name}<br />
                          {new Date(bet.event_start_time).toLocaleString('en-US', {
                            weekday: 'long',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            timeZone: 'America/New_York',
                            month: 'short',
                            day: 'numeric'
                          })} ET<br />
                          {bet.sport}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{bet.participant}</div>
                        <div className="text-sm text-gray-400">
                          {bet.type}<br />
                          {bet.source}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {bet.implied_probability.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center">
                      {bet.outcome_payout.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center text-green-500">
                      {bet.EV.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p>No betting opportunities match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}