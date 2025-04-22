import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SyncUser from "./SyncUser";

const Dashboard = () => {
   <SyncUser /> 
  const { getToken, userId } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        
        // Replace with your actual API endpoint
        const response = await fetch(`/api/user/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    // For demo purposes, set mock data
    // Remove this and uncomment fetchUserData() when your API is ready
    setMockData();
    // fetchUserData();
  }, [getToken, userId]);

  // Mock data for development - remove when connecting to real backend
  const setMockData = () => {
    setUserData({
      username: "GameMaster2023",
      totalGamesPlayed: 145,
      gamesWon: 87,
      gamesLost: 58,
      winRate: 60,
      level: 24,
      points: 12450,
      recentGames: [
        { id: 1, game: "Fortnite", result: "Won", date: "2025-04-17", score: 320 },
        { id: 2, game: "Call of Duty", result: "Lost", date: "2025-04-16", score: 180 },
        { id: 3, game: "Minecraft", result: "Won", date: "2025-04-15", score: 450 },
        { id: 4, game: "Among Us", result: "Won", date: "2025-04-14", score: 210 },
        { id: 5, game: "Valorant", result: "Lost", date: "2025-04-13", score: 195 },
      ],
      gameStats: [
        { name: "Fortnite", played: 42, won: 28, lost: 14 },
        { name: "Call of Duty", played: 35, won: 18, lost: 17 },
        { name: "Minecraft", played: 30, won: 23, lost: 7 },
        { name: "Among Us", played: 25, won: 13, lost: 12 },
        { name: "Valorant", played: 13, won: 5, lost: 8 },
      ],
      monthlyActivity: [
        { month: "Nov", games: 18 },
        { month: "Dec", games: 22 },
        { month: "Jan", games: 30 },
        { month: "Feb", games: 25 },
        { month: "Mar", games: 28 },
        { month: "Apr", games: 22 },
      ]
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl font-semibold">Loading your gaming stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-red-700 font-medium">Error loading dashboard: {error}</div>
        <button 
          className="mt-2 bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard title="Games Played" value={userData.totalGamesPlayed} color="bg-blue-100" textColor="text-blue-800" />
      <StatCard title="Games Won" value={userData.gamesWon} color="bg-green-100" textColor="text-green-800" />
      <StatCard title="Win Rate" value={`${userData.winRate}%`} color="bg-purple-100" textColor="text-purple-800" />
      <StatCard title="Level" value={userData.level} color="bg-yellow-100" textColor="text-yellow-800" />
    </div>
  );

  const renderRecentGames = () => (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Recent Games</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userData.recentGames.map((game) => (
            <tr key={game.id}>
              <td className="px-4 py-2 whitespace-nowrap">{game.game}</td>
              <td className="px-4 py-2 whitespace-nowrap">{game.date}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  game.result === "Won" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {game.result}
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{game.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Games Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData.gameStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="won" fill="#4ade80" name="Won" />
            <Bar dataKey="lost" fill="#f87171" name="Lost" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Win Rate by Game</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userData.gameStats.map(game => ({
                name: game.name, 
                value: game.won / game.played * 100
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({name, value}) => `${name}: ${value.toFixed(0)}%`}
            >
              {userData.gameStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userData.monthlyActivity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="games" fill="#8884d8" name="Games Played" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gaming Dashboard</h1>
            <p className="text-gray-600">Welcome back, {userData.username}</p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mt-2 sm:mt-0">
            <span className="font-medium">{userData.points} Points</span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              className={`px-3 py-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Game Stats
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm ${
                activeTab === 'activity'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
            <button
              className={`px-3 py-2 font-medium text-sm ${
                activeTab === 'recent'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('recent')}
            >
              Recent Games
            </button>
          </nav>
        </div>

        {/* Dashboard Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {renderOverview()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {renderRecentGames()}
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Win Rate Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Won", value: userData.gamesWon },
                        { name: "Lost", value: userData.gamesLost }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'recent' && renderRecentGames()}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color, textColor }) => (
  <div className={`${color} ${textColor} rounded-lg shadow p-4`}>
    <div className="text-sm font-medium">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
  </div>
);

export default Dashboard;