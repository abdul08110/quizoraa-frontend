import React, { useEffect, useState } from 'react';

interface Winner {
  rank: number;
  name: string;
  score: string;
  time: string;
  status: string;
}

interface Performance {
  hasParticipated: boolean;
  rank: number;
  score: string;
  time: string;
  correct: number;
  incorrect: number;
}

const Leaderboard: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [userPerformance, setUserPerformance] = useState<Performance | null>(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      // Mock winner list
      const winnersData: Winner[] = [
        { rank: 1, name: 'Vikram Singh', score: '20/20', time: '08:45', status: 'Winner' },
        { rank: 2, name: 'Anjali Mehta', score: '20/20', time: '09:12', status: '-' },
        { rank: 3, name: 'Rajesh Kumar', score: '19/20', time: '07:58', status: '-' },
        { rank: 4, name: 'Neha Sharma', score: '19/20', time: '08:23', status: '-' },
        { rank: 5, name: 'Amit Patel', score: '18/20', time: '09:05', status: '-' },
      ];

      // Mock user participation
      const performance: Performance = {
        hasParticipated: false,
        rank: 42,
        score: '16/20',
        time: '10:23',
        correct: 16,
        incorrect: 4,
      };

      setWinners(winnersData);
      setUserPerformance(performance);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">Please login to view leaderboard</h2>
        <a
          href="/login"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-extrabold text-center mb-6">Scoreboard</h1>

      <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 text-white px-6 py-3 font-bold text-lg">
          May 2023 Contest Results
        </div>

        <table className="w-full text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="text-left p-3">RANK</th>
              <th className="text-left p-3">NAME</th>
              <th className="text-left p-3">SCORE</th>
              <th className="text-left p-3">TIME (MM:SS)</th>
              <th className="text-left p-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr key={w.rank} className="border-t border-gray-200">
                <td className="p-3 font-bold text-indigo-700">{w.rank}</td>
                <td className="p-3 font-semibold">{w.name}</td>
                <td className="p-3 font-bold text-indigo-800">{w.score}</td>
                <td className="p-3">{w.time}</td>
                <td className="p-3">
                  {w.status === 'Winner' ? (
                    <span className="text-green-600 font-medium">Winner</span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userPerformance && userPerformance.hasParticipated ? (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Performance</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Your Rank</p>
              <p className="text-lg font-bold text-indigo-700">{userPerformance.rank}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Score</p>
              <p className="text-lg font-bold text-indigo-700">{userPerformance.score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Time</p>
              <p className="text-lg font-bold text-indigo-700">{userPerformance.time}</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-700 mb-2">Question Analysis</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${(userPerformance.correct / (userPerformance.correct + userPerformance.incorrect)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Correct: {userPerformance.correct}</span>
            <span>Incorrect: {userPerformance.incorrect}</span>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center text-red-600 font-medium">
          You missed this month’s contest! Stay tuned for the next one.
        </div>
      )}
    </div>
  );
};

export default Leaderboard;