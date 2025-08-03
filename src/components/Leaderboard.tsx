import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import type { Intern } from '../App';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Star className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">#{rank}</div>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-amber-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-orange-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600';
    }
  };

  const getRewardTiers = (donations: number): string[] => {
    const tiers: string[] = [];
    if (donations >= 1000) tiers.push('bronze');
    if (donations >= 5000) tiers.push('silver');
    if (donations >= 10000) tiers.push('gold');
    if (donations >= 25000) tiers.push('platinum');
    return tiers;
  };

  const getRewardColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-400 text-white';
      case 'silver':
        return 'bg-gray-400 text-white';
      case 'bronze':
        return 'bg-amber-600 text-white';
      case 'platinum':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-200 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <span>Leaderboard</span>
        </h1>
        <p className="text-xl text-gray-600">See how our interns are making a difference</p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboard.slice(0, 3).map((intern, index) => {
          const rank = index + 1;
          const tiers = getRewardTiers(intern.donationsRaised);
          return (
            <div
              key={intern.id}
              className={`relative bg-white rounded-2xl p-6 shadow-xl border-2 transform transition-all hover:scale-105 ${
                rank === 1 ? 'border-yellow-300 md:order-2' : 
                rank === 2 ? 'border-gray-300 md:order-1' : 
                'border-amber-300 md:order-3'
              }`}
            >
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center ${getRankBg(rank)}`}>
                {getRankIcon(rank)}
              </div>

              <div className="text-center pt-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {intern.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{intern.name}</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  ₹{intern.donationsRaised.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Code: {intern.referralCode}</p>

                <div className="mt-4 flex justify-center space-x-1">
                  {['bronze', 'silver', 'gold', 'platinum'].map((tier) => (
                    <div
                      key={tier}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        tiers.includes(tier) ? getRewardColor(tier) : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Rankings */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Complete Rankings</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {leaderboard.map((intern, index) => {
            const rank = index + 1;
            const tiers = getRewardTiers(intern.donationsRaised);
            return (
              <div
                key={intern.id}
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(rank)}
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {intern.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{intern.name}</h3>
                    <p className="text-sm text-gray-600">Code: {intern.referralCode}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{intern.donationsRaised.toLocaleString()}
                  </p>
                  <div className="flex space-x-1 mt-2">
                    {['bronze', 'silver', 'gold', 'platinum'].map((tier) => (
                      <div
                        key={tier}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tiers.includes(tier) ? getRewardColor(tier) : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Star className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
