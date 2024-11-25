import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, BarChart2, Calculator, LineChart, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const faqs = [
    { question: "What is Sports Logic Zone?", answer: "At Sports Logic Zone, we provide tools and resources to help you identify +EV opportunities and maximize your betting potential. Our platform simplifies the process, making it easier to make informed decisions and succeed in sports betting." },
    { question: "How does Sports Logic Zone actually work?", answer: "Sports Logic Zone one uses advanced analytics to uncover hidden +EV and arbitrage opportunities in sports betting. Our platform aggregates and analyzes odds data, providing you with actionable insights to make smarter, more profitable betting decisions." },
    { question: "Is Sports Logic Zone free to use?", answer: "Yes, Sports Logic Zone is currently free to use while we are in beta." },
    { question: "Can I use Sports Logic Zone on my mobile device?", answer: "Yes, Sports Logic Zone is fully responsive and works seamlessly on desktop, tablet, and mobile devices, allowing you to manage your job search on the go." },
    { question: "How do I get started with Sports Logic Zone?", answer: "Simply sign up for an account, complete your profile, and start exploring betting opportunities. Our tools will instantly begin analyzing odds to help you find +EV and arbitrage bets, with more advanced features coming soon." },
    { question: "Is my data secure with Sports Logic Zone?", answer: "Absolutely. We implement industry-standard security measures to protect your personal information and betting data. Your privacy and data security are our top priorities." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0f1219]">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
          <div className="bg-indigo-900/50 text-indigo-400 px-4 py-1 rounded-full inline-block mb-6 text-sm font-medium">
            Now in Beta - Get Early Access
          </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Enhance your betting skills</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
         Discover statistically profitable bets, designed for bettors. 
         From finding value opportunities to maximizing long-term sports betting success in one platform.
        </p>
        <Link
          to="/ev-bets"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Explore Profitable Bets
        </Link>
      </div>

      {/* Platform Preview */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1a1f2e] rounded-lg shadow-xl p-4 aspect-video flex items-center justify-center">
          <p className="text-gray-400">Platform Preview</p>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Betting Success Isn't Luck—It's Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <p className="text-sm text-gray-400">The majority of bettors lose because they bet without a plan</p>
            </div>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <BarChart2 className="h-8 w-8 text-indigo-500 mx-auto mb-4" />
              <p className="text-sm text-gray-400">Make data-driven decisions with our predictive analytics</p>
            </div>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <p className="text-sm text-gray-400">Our system ensures you identify +EV opportunities</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16">
          <h2 className="text-2xl font-bold text-center mb-12">How Sports Logic Zone Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1a1f2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold mb-2">Find the best value bets</h3>
              <p className="text-sm text-gray-400">Discover the most promising betting opportunities across all markets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1a1f2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold mb-2">In-Depth Odds & Line Analysis</h3>
              <p className="text-sm text-gray-400">Get detailed insights into line movements and market inefficiencies</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1a1f2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold mb-2">Execute Bet Strategy</h3>
              <p className="text-sm text-gray-400">Follow our systematic approach to maximize your profits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#1a1f2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold mb-2">Measure Your Success</h3>
              <p className="text-sm text-gray-400">Track your performance and make data-driven adjustments.</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Maximize Your Potential with Sports Logic Zone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">AI-Powered Bet Selection</h3>
              <p className="text-sm text-gray-400">Advanced algorithms analyze thousands of betting lines to find the best opportunities</p>
            </div>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">24/7 Bet Monitoring</h3>
              <p className="text-sm text-gray-400">Real-time updates on line movements and new opportunities</p>
            </div>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Smart Bet Tool (Coming Soon) </h3>
              <p className="text-sm text-gray-400">Calculate optimal bet sizes based on your bankroll and risk tolerance</p>
            </div>
            <div className="bg-[#1a1f2e] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Performance Analytics (Coming Soon)</h3>
              <p className="text-sm text-gray-400">Detailed tracking of your betting performance and ROI</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1f2e] rounded-lg">
                <button
                  className="w-full text-left p-4 flex items-center justify-between"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}