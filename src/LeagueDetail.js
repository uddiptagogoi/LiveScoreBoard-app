import React, { useState, useEffect } from "react";

export default function LeagueDetails({ leagueId }) { 
  const [leagueData, setLeagueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=${leagueId || 4328}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.leagues && data.leagues.length > 0) {
          setLeagueData(data.leagues[0]);
        } else {
          throw new Error("No league data found");
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching league details:", err);
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

      <style jsx>{`
        .league-details {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .loading, .error, .no-data {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
        }

        .error {
          color: #d32f2f;
        }

        .league-header {
          margin-bottom: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .league-basic-info {
          display: flex;
          align-items: center;
          padding: 30px;
          gap: 30px;
        }

        .league-badge {
          width: 120px;
          height: 120px;
          object-fit: contain;
          background: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .league-basic-info h2 {
          margin: 0 0 10px 0;
          font-size: 2.5em;
        }

        .league-alternate {
          margin: 0 0 20px 0;
          font-size: 1.2em;
          opacity: 0.9;
        }

        .league-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 15px;
        }

        .meta-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9em;
        }

        .league-banner {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          display: block;
        }

        .league-content {
          padding: 20px 0;
        }

        .league-description {
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .league-description h3 {
          color: #333;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .league-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 30px;
        }

        .league-website h3,
        .tv-rights h3,
        .league-media h3 {
          color: #333;
          border-bottom: 2px solid #764ba2;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .league-website p {
          margin: 10px 0;
        }

        .league-website a {
          color: #667eea;
          text-decoration: none;
        }

        .league-website a:hover {
          text-decoration: underline;
        }

        .tv-rights ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tv-rights li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .league-media .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }

        .media-item {
          text-align: center;
        }

        .media-item strong {
          display: block;
          margin-bottom: 10px;
          color: #666;
        }

        .media-image {
          width: 100%;
          max-height: 150px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .fanart-section {
          margin-top: 40px;
        }

        .fanart-section h3 {
          color: #333;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .fanart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .fanart-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .fanart-image:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .league-basic-info {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .league-meta {
            justify-content: center;
          }

          .league-basic-info h2 {
            font-size: 2em;
          }

          .league-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}