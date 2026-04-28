// import React, { useState } from "react";
// import "./MatchesPage.css";

// const MatcheInfo = () => {
//   const [activeTab, setActiveTab] = useState("live");

//   // Sample live matches data
//   const liveMatches = [
//     {
//       id: "l1",
//       sport: "Football",
//       team1: "Manchester United",
//       team2: "Liverpool",
//       score1: 2,
//       score2: 1,
//       time: "65'",
//       league: "Premier League",
//       status: "LIVE",
//     },
//     {
//       id: "l2",
//       sport: "Basketball",
//       team1: "Lakers",
//       team2: "Celtics",
//       score1: 98,
//       score2: 102,
//       time: "Q3 8:45",
//       league: "NBA",
//       status: "LIVE",
//     },
//     {
//       id: "l3",
//       sport: "Cricket",
//       team1: "India",
//       team2: "Pakistan",
//       score1: 245,
//       score2: 198,
//       time: "Overs 45.2/50",
//       league: "ODI",
//       status: "LIVE",
//     },
//     {
//       id: "l4",
//       sport: "Tennis",
//       team1: "Novak Djokovic",
//       team2: "Carlos Alcaraz",
//       score1: "6-4",
//       score2: "5-3",
//       time: "Set 2",
//       league: "ATP Masters",
//       status: "LIVE",
//     },
//   ];

//   // Sample past matches data
//   const pastMatches = [
//     {
//       id: "p1",
//       sport: "Football",
//       team1: "Barcelona",
//       team2: "Real Madrid",
//       score1: 3,
//       score2: 2,
//       date: "Nov 10, 2025",
//       league: "La Liga",
//       status: "FINISHED",
//     },
//     {
//       id: "p2",
//       sport: "Basketball",
//       team1: "Warriors",
//       team2: "Nets",
//       score1: 115,
//       score2: 110,
//       date: "Nov 9, 2025",
//       league: "NBA",
//       status: "FINISHED",
//     },
//     {
//       id: "p3",
//       sport: "Cricket",
//       team1: "Australia",
//       team2: "South Africa",
//       score1: 287,
//       score2: 264,
//       date: "Nov 8, 2025",
//       league: "Test Cricket",
//       status: "FINISHED",
//     },
//     {
//       id: "p4",
//       sport: "Tennis",
//       team1: "Serena Williams",
//       team2: "Emma Raducanu",
//       score1: "6-3",
//       score2: "6-2",
//       date: "Nov 7, 2025",
//       league: "WTA Finals",
//       status: "FINISHED",
//     },
//     {
//       id: "p5",
//       sport: "Football",
//       team1: "Chelsea",
//       team2: "Arsenal",
//       score1: 1,
//       score2: 1,
//       date: "Nov 6, 2025",
//       league: "Premier League",
//       status: "FINISHED",
//     },
//     {
//       id: "p6",
//       sport: "Basketball",
//       team1: "Suns",
//       team2: "Mavericks",
//       score1: 120,
//       score2: 118,
//       date: "Nov 5, 2025",
//       league: "NBA",
//       status: "FINISHED",
//     },
//   ];

//   const MatchCard = ({ match, isPast = false }) => {
//     const getSportColor = (sport) => {
//       const colors = {
//         Football: "#1e40af",
//         Basketball: "#dc2626",
//         Cricket: "#059669",
//         Tennis: "#7c3aed",
//       };
//       return colors[sport] || "#666";
//     };

//     return (
//       <div className="match-card" style={{ borderLeftColor: getSportColor(match.sport) }}>
//         <div className="match-header">
//           <span className="sport-badge" style={{ backgroundColor: getSportColor(match.sport) }}>
//             {match.sport}
//           </span>
//           <span className={`status-badge ${isPast ? "finished" : "live"}`}>
//             {match.status}
//           </span>
//         </div>

//         <div className="match-league">{match.league}</div>

//         <div className="match-body">
//           <div className="team">
//             <div className="team-name">{match.team1}</div>
//             <div className="team-score">{match.score1}</div>
//           </div>

//           <div className="match-center">
//             <div className="vs-text">vs</div>
//             <div className="match-time">{isPast ? match.date : match.time}</div>
//           </div>

//           <div className="team">
//             <div className="team-score">{match.score2}</div>
//             <div className="team-name">{match.team2}</div>
//           </div>
//         </div>

//         <div className="match-footer">
//           <button className="btn-view-details">View Details</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="matches-page">
//       <div className="matches-container">
//         <div className="matches-header">
//           <h1>Sports Matches</h1>
//           <p>Stay updated with live and past matches</p>
//         </div>

//         <div className="tabs-container">
//           <div className="tabs">
//             <button
//               className={`tab ${activeTab === "live" ? "active" : ""}`}
//               onClick={() => setActiveTab("live")}
//             >
//               <span className="live-dot"></span>
//               Live Matches ({liveMatches.length})
//             </button>
//             <button
//               className={`tab ${activeTab === "past" ? "active" : ""}`}
//               onClick={() => setActiveTab("past")}
//             >
//               <span className="past-dot"></span>
//               Past Matches ({pastMatches.length})
//             </button>
//           </div>
//         </div>

//         <div className="matches-content">
//           {activeTab === "live" ? (
//             <div className="matches-grid">
//               {liveMatches.length > 0 ? (
//                 liveMatches.map((match) => (
//                   <MatchCard key={match.id} match={match} isPast={false} />
//                 ))
//               ) : (
//                 <div className="no-matches">
//                   <p>No live matches right now. Check back later!</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="matches-grid">
//               {pastMatches.length > 0 ? (
//                 pastMatches.map((match) => (
//                   <MatchCard key={match.id} match={match} isPast={true} />
//                 ))
//               ) : (
//                 <div className="no-matches">
//                   <p>No past matches available.</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatcheInfo;
