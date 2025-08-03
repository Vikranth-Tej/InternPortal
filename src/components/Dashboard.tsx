import { DollarSign, Users, Award, Copy, Trophy, Medal, Star, Crown } from 'lucide-react';
import type { Intern } from '../App';

interface DashboardProps {
  intern: Intern;
}

export default function Dashboard({ intern }: DashboardProps) {
  const copyReferralCode = () => {
    navigator.clipboard.writeText(intern.referralCode);
    // Optional: add toast or alert
  };

  const rewards = [
    {
      name: 'Bronze Achiever',
      icon: Medal,
      description: 'Raise Rs 1,000 in donations',
      unlocked: intern.donationsRaised >= 1000,
      requirement: 1000,
    },
    {
      name: 'Silver Supporter',
      icon: Star,
      description: 'Raise Rs 5,000 in donations',
      unlocked: intern.donationsRaised >= 5000,
      requirement: 5000,
    },
    {
      name: 'Gold Champion',
      icon: Trophy,
      description: 'Raise Rs 10,000 in donations',
      unlocked: intern.donationsRaised >= 10000,
      requirement: 10000,
    },
    {
      name: 'Platinum Legend',
      icon: Crown,
      description: 'Raise Rs 25,000 in donations',
      unlocked: intern.donationsRaised >= 25000,
      requirement: 25000,
    },
  ];

  const getNextTier = () => {
    for (const reward of rewards) {
      if (!reward.unlocked) return reward;
    }
    return null;
  };

  const nextTier = getNextTier();
  const nextTarget = nextTier?.requirement || 25000;
  const remaining = Math.max(0, nextTarget - intern.donationsRaised);
  const progressPercent = Math.min(100, (intern.donationsRaised / nextTarget) * 100);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {intern.name}!</h1>
        <p className="text-blue-100">Here's your donation progress and achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Raised */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-3xl font-bold text-gray-900">
                Rs {intern.donationsRaised.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="mt-4">
            {nextTier ? (
              <>
                <div className="text-sm text-gray-600">
                  Progress to {nextTier.name.split(' ')[0]}: Rs {remaining.toLocaleString()} to go
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="text-sm text-green-700 font-semibold mt-2">
                🎉 You've reached the top tier: Platinum Legend!
              </div>
            )}
          </div>
        </div>

        {/* Current Rank */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Rank</p>
              <p className="text-3xl font-bold text-gray-900">#{intern.rank}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Trophy className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {intern.rank === 1 ? "You're in the lead! 🎉" : "Keep pushing to climb higher!"}
          </p>
        </div>

        {/* Referral Code */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Referral Code</p>
              <p className="text-2xl font-bold text-gray-900">{intern.referralCode}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <button
            onClick={copyReferralCode}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Code</span>
          </button>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Award className="w-6 h-6" />
          <span>Rewards & Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 transition-all ${
                  reward.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      reward.unlocked
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${reward.unlocked ? 'text-white' : 'text-gray-500'}`}
                    />
                  </div>
                  <h3
                    className={`font-bold mb-2 ${
                      reward.unlocked ? 'text-amber-800' : 'text-gray-500'
                    }`}
                  >
                    {reward.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      reward.unlocked ? 'text-amber-700' : 'text-gray-500'
                    }`}
                  >
                    {reward.description}
                  </p>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      reward.unlocked
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {reward.unlocked
                      ? '✓ Unlocked'
                      : `Rs ${reward.requirement.toLocaleString()} needed`}
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
