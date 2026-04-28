import { useState } from "react";

export default function FamousFootballLeagues() {
  const leagues = [
    {
      id: 1,
      name: "English Premier League",
      country: "England",
      founded: 1992,
      famousClubs: "Manchester United, Liverpool, Arsenal, Chelsea",
      description: "The most popular and commercially successful football league in the world."
    },
    {
      id: 2,
      name: "La Liga",
      country: "Spain",
      founded: 1929,
      famousClubs: "Real Madrid, Barcelona, Atlético Madrid",
      description: "Known for technical and attacking football with global superstars."
    },
    {
      id: 3,
      name: "Bundesliga",
      country: "Germany",
      founded: 1963,
      famousClubs: "Bayern Munich, Borussia Dortmund",
      description: "Famous for high attendance, passionate fans, and fast-paced games."
    },
    {
      id: 4,
      name: "Serie A",
      country: "Italy",
      founded: 1898,
      famousClubs: "Juventus, AC Milan, Inter Milan",
      description: "Traditionally known for tactical and defensive football."
    },
    {
      id: 5,
      name: "Ligue 1",
      country: "France",
      founded: 1932,
      famousClubs: "PSG, Marseille",
      description: "Well known for developing young football talent."
    }
  ];

  const [selectedLeague, setSelectedLeague] = useState(null);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Table Section */}
      <div className="md:col-span-2">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">League</th>
              <th className="border p-2 text-left">Country</th>
            </tr>
          </thead>
          <tbody>
            {leagues.map((league) => (
              <tr
                key={league.id}
                onClick={() => setSelectedLeague(league)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="border p-2">{league.name}</td>
                <td className="border p-2">{league.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Section */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4">League Details</h2>
        {selectedLeague ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {selectedLeague.name}</p>
            <p><strong>Country:</strong> {selectedLeague.country}</p>
            <p><strong>Founded:</strong> {selectedLeague.founded}</p>
            <p><strong>Famous Clubs:</strong> {selectedLeague.famousClubs}</p>
            <p><strong>Description:</strong> {selectedLeague.description}</p>
          </div>
        ) : (
          <p className="text-gray-500">Click on a league to see details</p>
        )}
      </div>
    </div>
  );
}
