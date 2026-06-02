import React, { useState, useEffect } from "react";
import './LeagueDetail.css';

export default function LeagueDetails({ leagueId }) { 
  const [leagueData, setLeagueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(
            `http://localhost:8080/mynewapp/league-details/${leagueId || 4328}`
        );

        const data = await response.json();
          setLeagueData(data);
        
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueDetails();
  }, [leagueId]);

  const formatTvRights = (tvRightsString) => {
    if (!tvRightsString) return [];
    return tvRightsString.split('\r\n').filter(item => item.trim() !== '');
  };

  if (loading) {
    return (
      <div className="league-details">
        <div className="loading">Loading league details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="league-details">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!leagueData) {
    return (
      <div className="league-details">
        <div className="no-data">No league data available</div>
      </div>
    );
  }

  const tvRights = formatTvRights(leagueData.strTvRights);

  return (
    <div className="league-details">
      <div className="league-header">
        <div className="league-basic-info">
          {leagueData.strBadge && (
            <img 
              src={leagueData.strBadge} 
              alt={`${leagueData.strLeague} badge`}
              className="league-badge"
            />
          )}
          <div>
            <h2>{leagueData.strLeague}</h2>
            <p className="league-alternate">{leagueData.strLeagueAlternate}</p>
            <div className="league-meta">
              <span className="meta-item">
                <strong>Sport:</strong> {leagueData.strSport}
              </span>
              <span className="meta-item">
                <strong>Country:</strong> {leagueData.strCountry}
              </span>
              <span className="meta-item">
                <strong>Formed:</strong> {leagueData.intFormedYear}
              </span>
              <span className="meta-item">
                <strong>Current Season:</strong> {leagueData.strCurrentSeason}
              </span>
            </div>
          </div>
        </div>

        {leagueData.strBanner && (
          <img 
            src={leagueData.strBanner} 
            alt={`${leagueData.strLeague} banner`}
            className="league-banner"
          />
        )}
      </div>

      <div className="league-content">
        <div className="league-description">
          <h3>Description</h3>
          <p>{leagueData.strDescriptionEN || "No description available."}</p>
        </div>

        <div className="league-details-grid">
          <div className="league-website">
            <h3>Website & Social Media</h3>
            {leagueData.strWebsite && (
              <p>
                <strong>Website:</strong>{" "}
                <a href={leagueData.strWebsite} target="_blank" rel="noopener noreferrer">
                  {leagueData.strWebsite}
                </a>
              </p>
            )}
            {leagueData.strTwitter && (
              <p>
                <strong>Twitter:</strong>{" "}
                <a href={`https://${leagueData.strTwitter}`} target="_blank" rel="noopener noreferrer">
                  {leagueData.strTwitter}
                </a>
              </p>
            )}
            {leagueData.strFacebook && (
              <p>
                <strong>Facebook:</strong>{" "}
                <a href={`https://${leagueData.strFacebook}`} target="_blank" rel="noopener noreferrer">
                  {leagueData.strFacebook}
                </a>
              </p>
            )}
            {leagueData.strInstagram && (
              <p>
                <strong>Instagram:</strong>{" "}
                <a href={`https://${leagueData.strInstagram}`} target="_blank" rel="noopener noreferrer">
                  {leagueData.strInstagram}
                </a>
              </p>
            )}
            {leagueData.strYoutube && (
              <p>
                <strong>YouTube:</strong>{" "}
                <a href={`https://${leagueData.strYoutube}`} target="_blank" rel="noopener noreferrer">
                  {leagueData.strYoutube}
                </a>
              </p>
            )}
          </div>

          {tvRights.length > 0 && (
            <div className="tv-rights">
              <h3>TV Broadcast Rights</h3>
              <ul>
                {tvRights.map((right, index) => {
                  const [region, broadcaster] = right.split(' - ');
                  return (
                    <li key={index}>
                      <strong>{region}:</strong> {broadcaster}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="league-media">
            <h3>Media</h3>
            <div className="media-grid">
              {leagueData.strLogo && (
                <div className="media-item">
                  <strong>Logo:</strong>
                  <img 
                    src={leagueData.strLogo} 
                    alt={`${leagueData.strLeague} logo`}
                    className="media-image"
                  />
                </div>
              )}
              {leagueData.strPoster && (
                <div className="media-item">
                  <strong>Poster:</strong>
                  <img 
                    src={leagueData.strPoster} 
                    alt={`${leagueData.strLeague} poster`}
                    className="media-image"
                  />
                </div>
              )}
              {leagueData.strTrophy && (
                <div className="media-item">
                  <strong>Trophy:</strong>
                  <img 
                    src={leagueData.strTrophy} 
                    alt={`${leagueData.strLeague} trophy`}
                    className="media-image"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {leagueData.strFanart1 && (
          <div className="fanart-section">
            <h3>Gallery</h3>
            <div className="fanart-grid">
              {[1, 2, 3, 4].map(num => {
                const fanartUrl = leagueData[`strFanart${num}`];
                return fanartUrl ? (
                  <img 
                    key={num}
                    src={fanartUrl} 
                    alt={`${leagueData.strLeague} fanart ${num}`}
                    className="fanart-image"
                  />
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}