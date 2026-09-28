import React, { useState, useEffect } from 'react';
import './LeagueMatches.css';
import { format } from 'date-fns';

export default function LeagueMatches({ leagueId }) {
  //const [matches, setMatches] = useState([]);
  const [groupedMatches, setGroupedMatches] = useState({});
  const [dates, setDates] = useState([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch matches when leagueId changes
  useEffect(() => {
    const fetchMatches = async () => {
      if (!leagueId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const sportsDbLeagueId = leagueId;
        
        if (!sportsDbLeagueId) {
          throw new Error(`League ID ${leagueId} not found in mapping`);
        }
        
        // Using current season (2025-2026 as per your example)
        const currentYear = new Date().getFullYear();
        const season = `${currentYear - 1}-${currentYear}`;
        
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=${sportsDbLeagueId}&s=${season}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.events) {
          // Transform API data
          const transformedMatches = data.events.map(match => ({
            id: match.idEvent,
            homeTeam: match.strHomeTeam,
            awayTeam: match.strAwayTeam,
            homeScore: match.intHomeScore,
            awayScore: match.intAwayScore,
            date: match.dateEvent,
            time: match.strTime ? match.strTime.substring(0, 5) : 'TBD',
            homeTeamBadge: match.strHomeTeamBadge,
            awayTeamBadge: match.strAwayTeamBadge,
            status: match.strStatus !== 'Match Finished' ? 'FT' : (match.strTime ? match.strTime.substring(0, 5) : 'TBD'),
            strEvent: match.strEvent,
            timestamp: match.strTimestamp,
          }));
          
          //setMatches(transformedMatches);
          
          // Group matches by date
          const grouped = transformedMatches.reduce((acc, match) => {
            if (!acc[match.date]) {
              acc[match.date] = [];
            }
            acc[match.date].push(match);
            return acc;
          }, {});
          
          setGroupedMatches(grouped);
          
          // Extract unique dates and sort them
          const uniqueDates = Object.keys(grouped).sort();
          setDates(uniqueDates);
          
          // Set current date to today if available, otherwise first date
          const today = format(new Date(), 'yyyy-MM-dd');
          const todayIndex = uniqueDates.indexOf(today);
          setCurrentDateIndex(todayIndex !== -1 ? todayIndex : 0);
        } else {
          //setMatches([]);
          setGroupedMatches({});
          setDates([]);
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message);
        //setMatches([]);
        setGroupedMatches({});
        setDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueId]);

  // Handle previous date
  const handlePrevDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(prev => prev - 1);
    }
  };

  // Handle next date
  const handleNextDate = () => {
    if (currentDateIndex < dates.length - 1) {
      setCurrentDateIndex(prev => prev + 1);
    }
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (err) {
      return dateString;
    }
  };

  // Format time for display
  /*const formatDisplayTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (err) {
      return timeString;
    }
  };*/

  // Loading state
  if (loading) {
    return (
      <div className="league-match-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading matches...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="league-match-container">
        <div className="text-center py-5 text-danger">
          <p>Error loading matches: {error}</p>
          <button 
            className="btn btn-sm btn-primary mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No matches state
  if (dates.length === 0) {
    return (
      <div className="league-match-container">
        <div className="text-center py-5 text-muted">
          <p>No matches available for this league</p>
        </div>
      </div>
    );
  }

  const currentDate = dates[currentDateIndex];
  const currentMatches = groupedMatches[currentDate] || [];

  return (
    <div className="league-match-container">
      {/* Date navigation header */}
      <div className="date-navigation">
        <button 
          className="nav-arrow" 
          onClick={handlePrevDate}
          disabled={currentDateIndex === 0}
        >
          ←
        </button>
        
        <div className="current-date">
          <h3 className="date-title">{formatDisplayDate(currentDate)}</h3>
          <p className="date-subtitle">
            {currentMatches.length} match{currentMatches.length !== 1 ? 'es' : ''}
          </p>
        </div>
        
        <button 
          className="nav-arrow" 
          onClick={handleNextDate}
          disabled={currentDateIndex === dates.length - 1}
        >
          →
        </button>
      </div>

      {/* Date selector pills */}
      <div className="date-selector">
        {dates.slice(
          Math.max(0, currentDateIndex - 2),
          Math.min(dates.length, currentDateIndex + 3)
        ).map((date, index) => {
          const globalIndex = Math.max(0, currentDateIndex - 2) + index;
          const isActive = globalIndex === currentDateIndex;
          
          return (
            <button
              key={date}
              className={`date-pill ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentDateIndex(globalIndex)}
            >
              {format(new Date(date), 'MMM d')}
            </button>
          );
        })}
      </div>

      {/* Matches list */}
      <div className="matches-list">
        {currentMatches.length > 0 ? (
          currentMatches.map((match) => (
            <div key={match.id} className="league-match-card shadow-sm">
              
              <div className="match-content-left-col">
                {/* Home team */}
                <div className="team-section home-team">
                  <div className="team-info">
                    {match.homeTeamBadge && (
                      <img 
                        src={match.homeTeamBadge} 
                        alt={match.homeTeam}
                        className="team-badge"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/40x40?text=🏠';
                        }}
                      />
                    )}
                    <span className="team-name">{match.homeTeam}</span>
                  </div>
                  <div className="team-score">
                    {match.homeScore !== null ? match.homeScore : '-'}
                  </div>
                </div>
                
                {/* Away team */}
                <div className="team-section away-team">
                  <div className="team-info">
                    {match.awayTeamBadge && (
                      <img 
                        src={match.awayTeamBadge} 
                        alt={match.awayTeam}
                        className="team-badge"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/40x40?text=✈️';
                        }}
                      />
                    )}
                    <span className="team-name">{match.awayTeam}</span>
                  </div>
                  <div className="team-score">
                    {match.awayScore !== null ? match.awayScore : '-'}
                  </div>                  
                </div>
              </div>              
              {/* Match footer */}
              <div className="match-content-right-col">
                <div className="match-status">
                  <span className="match-time-text">{match.status}</span>
                </div>
             </div>
            </div>
          ))
        ) : (
          <div className="no-matches-message">
            No matches scheduled for {formatDisplayDate(currentDate)}
          </div>
        )}
      </div>
      
      {/* Date navigation footer */}
      {/* <div className="date-navigation-footer">
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={handlePrevDate}
          disabled={currentDateIndex === 0}
        >
          Previous Date
        </button>
        <span className="date-counter">
          {currentDateIndex + 1} of {dates.length} dates
        </span>
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={handleNextDate}
          disabled={currentDateIndex === dates.length - 1}
        >
          Next Date
        </button>
      </div> */}
    </div>
  );
}
