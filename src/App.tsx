import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import { User, Trophy, Home, LogOut } from 'lucide-react';

export interface Intern {
  id: number;
  name: string;
  email: string;
  referralCode: string;
  donationsRaised: number;
  rank: number;
  rewards: {
    bronze: boolean;
    silver: boolean;
    gold: boolean;
    platinum: boolean;
  };
}

function App() {
  const [currentUser, setCurrentUser] = useState<Intern | null>(null);
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'leaderboard'>('login');

  const handleLogin = (intern: Intern) => {
    setCurrentUser(intern);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-8 h-8 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h1 className="text-xl font-bold text-gray-900">Intern Portal</h1>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setCurrentPage('leaderboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'leaderboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {currentPage === 'dashboard' && <Dashboard intern={currentUser} />}
        {currentPage === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  );
}

export default App;