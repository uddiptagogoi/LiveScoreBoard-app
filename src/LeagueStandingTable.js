import React, { useState, useEffect } from "react";
import './LeagueStandingTable.css';

function LeagueStandingTable({ selectedLeagueId }) {
    console.log("Selected League ID:", selectedLeagueId);
  const [selectedLeague, setSelectedLeague] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagueStandings = async () => {
      // If no league selected, clear the data
      if (!selectedLeagueId) {
        setSelectedLeague([]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const sportsDbLeagueId = selectedLeagueId;
        
        if (!sportsDbLeagueId) {
          throw new Error(`League ID ${selectedLeagueId} not found in mapping`);
        }

        const response = await fetch(
          `http://localhost:8080/mynewapp/standings/${selectedLeagueId}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched league standings data:", data);
        if (Array.isArray(data)) {
          // Transform the API data to match our component's expected structure
          const transformedData = data.map((team, index) => ({
            id: parseInt(team.rank) || index + 1,
            name: team.teamName,
            Play: parseInt(team.played) || 0,
            win: parseInt(team.win) || 0,
            draw: parseInt(team.draw) || 0,
            loss: parseInt(team.loss) || 0,
            goalsFor: parseInt(team.goalsFor) || 0,
            goalsAgainst: parseInt(team.goalsAgainst) || 0,
            goalDifference: parseInt(team.goalDifference) || 0,
            points: parseInt(team.points) || 0,
            // Additional data from API that we might want to display
            strBadge: team.badge,
            strForm: team.strForm,
            strDescription: team.strDescription,
            idTeam: team.idTeam,
          }));
          
          setSelectedLeague(transformedData);
        } else {
          setSelectedLeague([]);
        }
      } catch (err) {
        console.error("Error fetching league standings:", err);
        setError(err.message);
        setSelectedLeague([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueStandings();
  }, [selectedLeagueId]);

  // Render loading state
  if (loading) {
    return (
      <div className="league-table-card">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">Table</h3>
          <div className="mt-3 leagues-container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading league standings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="league-table-card">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">Table</h3>
          <div className="mt-3 leagues-container text-center text-danger">
            <p>Error loading standings: {error}</p>
            <button 
              className="btn btn-sm btn-primary mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render empty state when no league is selected
  if (!selectedLeagueId || selectedLeague.length === 0) {
    return (
      <div className="league-table-card">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">Table</h3>
          <div className="mt-3 leagues-container text-center">
            <p className="text-muted">Select a league to view standings</p>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="card-body d-flex flex-column">
        <h3 className="card-title text-center">Table</h3>
        <div className="leagues-container">
          <div className={`league-standing-table`}>
            <table className="w-full border-gray-300 rounded-lg table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="team-fix-column">#</th>
                  <th className="team-name-column" key="team">Team</th>
                  <th className="team-fix-column" key="play">P</th>
                  <th className="team-fix-column" key="win">W</th>
                  <th className="team-fix-column" key="draw">D</th>
                  <th className="team-fix-column" key="loss">L</th>
                  <th className="team-fix-column" key="goalsFor">F</th>
                  <th className="team-fix-column" key="goalsAgainst">A</th>
                  <th className="team-fix-column" key="goalDifference">GD</th>
                  <th className="team-fix-column" key="points">PTS</th>
                </tr>
              </thead>
              <tbody>
                {selectedLeague.map((team) => (
                  <tr
                    key={team.id}
                    className="narrow"
                    title={team.strDescription || ""}
                  >
                    <td className="team-fix-column">{team.id}</td>
                    <td className="team-name-column">
                      <div className="d-flex align-items-center">
                        {team.strBadge && (
                          <img 
                            src={team.strBadge} 
                            alt={team.name}
                            style={{ width: '20px', height: '20px', marginRight: '8px' }}
                          />
                        )}
                        <span>{team.name}</span>
                        {/* {team.strForm && (
                          <span className="badge bg-light text-dark ms-2" style={{ fontSize: '0.7em' }}>
                            Form: {team.strForm}
                          </span>
                        )} */}
                      </div>
                    </td>
                    <td className="team-fix-column">{team.Play}</td>
                    <td className="team-fix-column">{team.win}</td>
                    <td className="team-fix-column">{team.draw}</td>
                    <td className="team-fix-column">{team.loss}</td>
                    <td className="team-fix-column">{team.goalsFor}</td>
                    <td className="team-fix-column">{team.goalsAgainst}</td>
                    <td className="team-fix-column">{team.goalDifference}</td>
                    <td className="team-fix-column fw-bold">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Optional: Display league info */}
          <div className="mt-3">
            <div className="card">
              <div className="card-body p-3">
                <h6 className="mb-2">Key</h6>
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted">
                      <strong>P:</strong> Played • <strong>W:</strong> Win
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">
                      <strong>D:</strong> Draw • <strong>L:</strong> Loss
                    </small>
                  </div>
                  <div className="col-6 mt-1">
                    <small className="text-muted">
                      <strong>F:</strong> Goals For • <strong>A:</strong> Goals Against
                    </small>
                  </div>
                  <div className="col-6 mt-1">
                    <small className="text-muted">
                      <strong>GD:</strong> Goal Difference • <strong>PTS:</strong> Points
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LeagueStandingTable;