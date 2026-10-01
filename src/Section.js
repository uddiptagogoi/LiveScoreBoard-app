import React, { useState, useEffect } from "react";
import "./Section.css";
import LeagueStandingTable from "./LeagueStandingTable";
import LeagueStatistics from "./LeagueStatistics";
import LeagueDetails from "./LeagueDetail";
import LeagueMatches from "./LeagueMatches";

function CardSection() {
  // State to track which league is selected
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [activeLeagueInfoTab, setActiveLeagueInfoTab] = useState('standing');
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leagues from API on component mount
  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          "https://livescoreboard-api.onrender.com/mynewapp/leagues"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched leagues data:", data.get);
        if (Array.isArray(data)) {
          // Filter for football/soccer leagues only and add internal IDs
          const footballLeagues = data.map((league) => ({
              internalId: league.idLeague,   // ✅ FIXED
              idLeague: league.idLeague,
              name: league.name,
              country: league.country,
              logo: league.logo,
              apiData: league
            }));
          
          setLeagues(footballLeagues);
          
          // Auto-select first league
          if (footballLeagues.length > 0) {
            setSelectedLeagueId(footballLeagues[0].internalId);
          }
        } else {
          setLeagues([]);
        }
      } catch (err) {
        console.error("Error fetching leagues:", err);
        setError(err.message);
        setLeagues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

      // Helper functions to populate league data
 /* const getCountryFromLeagueName = (leagueName) => {
    const countryMap = {
      'English': 'England',
      'Scottish': 'Scotland',
      'German': 'Germany',
      'Italian': 'Italy',
      'French': 'France',
      'Spanish': 'Spain',
      'Greek': 'Greece',
      'Dutch': 'Netherlands',
      'Belgian': 'Belgium',
      'Portuguese': 'Portugal',
      'MLS': 'USA',
      'Brazilian': 'Brazil',
      'Argentinian': 'Argentina'
    }; 

    for (const [key, value] of Object.entries(countryMap)) {
      if (leagueName.includes(key)) {
        return value;
      }
    }
    return 'International';
  }; */

/*  const getLeagueLogo = (idLeague, leagueName) => {
    // Using TheSportsDB's badge API
    return `https://www.thesportsdb.com/images/media/league/badge/${idLeague}.png`;
  }; */

  const handleLeagueClick = (league) => {
    setSelectedLeagueId(league.internalId);
  };

  const handleTabClick = (tab) => {
    setActiveLeagueInfoTab(tab);
  };

  // Render the active section based on activeLeagueInfoTab state
  const renderActiveSection = () => {
    if (!selectedLeagueId) return null;
    
    switch(activeLeagueInfoTab) {
      case 'standing':
        return <LeagueStandingTable selectedLeagueId={selectedLeagueId} />;
      case 'matches':
        return <LeagueMatches leagueId={selectedLeagueId} />;
      case 'statistics':
        return <LeagueStatistics leagueId={selectedLeagueId} />;
      case 'details':
        return <LeagueDetails leagueId={selectedLeagueId} />;
      default:
        return <LeagueStandingTable selectedLeagueId={selectedLeagueId} />;
    }
  };

  // Find the selected league object
  //const selectedLeague = leagues.find(league => league.internalId === selectedLeagueId);

  return (
      <div className="home-page-container">
        {/* Left ads column */}
        <div style={{"width": "15%"}}>
          <div id="ads" style={{}}></div>
        </div>
        
        {/* Leagues list column */}
        <div key="football" className="leagues-card col-12">
          <div className="card-body d-flex flex-column">
            <div>
              <h3 className="card-title text-center">Leagues</h3>
              <p className="text-center">Top leagues & competitions</p>
            </div>
            {loading ? (
              <div className="mt-3 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading leagues...</p>
              </div>
            ) : error ? (
              <div className="mt-3 text-center text-danger">
                <p>Error loading leagues: {error}</p>
                <button 
                  className="btn btn-sm btn-primary mt-2"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="mt-3 leagues-container">
                {leagues.map((league) => (
                  <div 
                    key={league.idLeague} 
                    className={`league-card h-100 shadow-sm leagues-grid-card ${selectedLeagueId === league.internalId ? 'selected' : ''}`}
                    onClick={() => handleLeagueClick(league)}
                    style={{
                      cursor: 'pointer',
                      border: selectedLeagueId === league.internalId ? '2px solid #007bff' : '1px solid #dee2e6'
                    }}
                  >
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center">
                        {/* League logo */}
                        <div className="me-3">
                          {/* <img 
                            src={league.logo} 
                            alt={league.name}
                            style={{ 
                              width: '40px', 
                              height: '40px',
                              objectFit: 'contain',
                              backgroundColor: '#f8f9fa',
                              padding: '4px',
                              borderRadius: '4px'
                            }}
                            // onError={(e) => {
                            //   e.target.onerror = null;
                            //   e.target.src = 'https://via.placeholder.com/40x40?text=⚽';
                            // }}
                          /> */}
                        </div>
                        
                        {/* League info */}
                        <div className="flex-grow-1">
                          <p className="card-title mb-1 leagues-container-league-name">
                            {league.name}
                          </p>
                          <p className="card-text text-muted small mb-0">
                            {league.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* League info column */}
        <div className="league-info-card">
          <div className="league-info-button-card"> 
            <button 
              className={`league-info-card-button ${activeLeagueInfoTab === 'standing' ? 'active' : ''}`}
              onClick={() => handleTabClick('standing')}
            >
              Standing
            </button> 
            <button 
              className={`league-info-card-button ${activeLeagueInfoTab === 'matches' ? 'active' : ''}`}
              onClick={() => handleTabClick('matches')}
            >
              Matches
            </button> 
            <button 
              className={`league-info-card-button ${activeLeagueInfoTab === 'statistics' ? 'active' : ''}`}
              onClick={() => handleTabClick('statistics')}
            >
              Statistics
            </button> 
            <button 
              className={`league-info-card-button ${activeLeagueInfoTab === 'details' ? 'active' : ''}`}
              onClick={() => handleTabClick('details')}
            >
              Details
            </button> 
          </div> 
          
          <div className="league-info-section-card">
            {selectedLeagueId ? (
              renderActiveSection()
            ) : (
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3 className="card-title text-center mb-3">League Information</h3>
                <p className="text-muted text-center">
                  {loading ? 'Loading...' : 'Select a league to view information'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right ads column */}
        <div style={{"width": "15%"}}>
          <div id="ads" style={{}}></div>
        </div>
      </div>
  );
}

export default CardSection;
