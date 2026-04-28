import React, { useState, useRef, useEffect } from 'react';
import './UserCustomScoreBoard.css';

const UserCustomScoreBoard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'soccer',
      homeTeam: 'Lions',
      awayTeam: 'Tigers',
      homeScore: 2,
      awayScore: 1,
      time: "72'",
      live: true,
      // assume match started 72 minutes ago for demo
      liveStart: Date.now() - 72 * 60 * 1000,
      stats: { possession: '62%', shots: '10-4', fouls: 8 }
    },
    {
      id: 2,
      type: 'basketball',
      homeTeam: 'Eagles',
      awayTeam: 'Hawks',
      homeScore: 89,
      awayScore: 92,
      time: 'Q4 02:12',
      live: false,
      stats: { fouls: 18, turnovers: 7 }
    },
    {
      id: 3,
      type: 'cricket',
      homeTeam: 'Sharks',
      awayTeam: 'Dolphins',
      homeScore: '220/6',
      awayScore: '211/10',
      time: 'Innings break',
      live: false,
      stats: { overs: '50.0', wickets: 6 }
    }
  ]);
  // sample past matches to search from
  const pastMatches = [
    { id: 'm1', type: 'soccer', homeTeam: 'Lions', awayTeam: 'Tigers', homeScore: 2, awayScore: 1, date: '2025-10-12', score: '2-1', live: true, stats: { possession: '62%', shots: '10-4' }, title: 'Lions vs Tigers' },
    { id: 'm2', type: 'basketball', homeTeam: 'Eagles', awayTeam: 'Hawks', homeScore: 89, awayScore: 92, date: '2025-09-30', score: '89-92', live: false, stats: { quarters: [22,24,20,23] }, title: 'Eagles vs Hawks' },
    { id: 'm3', type: 'cricket', homeTeam: 'Sharks', awayTeam: 'Dolphins', homeScore: '220/6', awayScore: '211/10', date: '2025-08-21', score: '220/6 - 211/10', live: false, stats: { overs: '50.0', wickets: 6 }, title: 'Sharks vs Dolphins' },
    { id: 'm4', type: 'soccer', homeTeam: 'Panthers', awayTeam: 'Bears', homeScore: 0, awayScore: 2, date: '2025-07-15', score: '0-2', live: false, stats: {}, title: 'Panthers vs Bears' },
    { id: 'm5', type: 'soccer', homeTeam: 'Wolves', awayTeam: 'Bulls', homeScore: 4, awayScore: 2, date: '2024-12-01', score: '4-2', live: false, stats: {}, title: 'Wolves vs Bulls' }
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(pastMatches);
  // allow multiple cards to be expanded at once; clicking toggles expansion
  const [expandedCards, setExpandedCards] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const dragNode = useRef(null);
  const [, setTick] = useState(0);

  // tick to update running times every second when any match is live
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Open search modal to add a card from past matches
  const handleAddCard = () => {
    setQuery('');
    setFilteredMatches(pastMatches);
    setShowSearch(true);
  };

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    const filtered = pastMatches.filter(m => m.title.toLowerCase().includes(q.toLowerCase()));
    setFilteredMatches(filtered);
  };

  const handleSelectMatch = (match) => {
    const newId = Math.max(...cards.map(card => card.id), 0) + 1;
    const newCard = {
      id: newId,
      type: match.type || 'soccer',
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.homeScore ?? match.score ?? '0',
      awayScore: match.awayScore ?? '',
      time: match.time ?? match.date,
      live: !!match.live,
      liveStart: match.live ? Date.now() : undefined,
      stats: match.stats || {}
    };
    setCards(prev => [...prev, newCard]);
    setShowSearch(false);
  };

  const toggleExpand = (cardId) => {
    if (dragNode.current) return; // don't toggle while dragging
    setExpandedCards(prev => {
      if (prev.includes(cardId)) return prev.filter(id => id !== cardId);
      return [...prev, cardId];
    });
  };

  const formatRunningTime = (card) => {
    if (card.live && card.liveStart) {
      const elapsed = Date.now() - card.liveStart;
      if (card.type === 'soccer') {
        const mins = Math.floor(elapsed / 60000);
        return `${mins}'`;
      }
      const m = Math.floor(elapsed / 60000);
      const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      return `${m}:${s}`;
    }
    return card.time || '';
  };

  const handleCloseSearch = (e) => {
    // close when clicking on overlay background
    if (e.target.classList && e.target.classList.contains('search-overlay')) {
      setShowSearch(false);
    }
  };

  // Handle deleting a card
  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  // Drag start handler
  const handleDragStart = (e, card) => {
    // use currentTarget to ensure we reference the draggable element itself
    dragNode.current = e.currentTarget;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setDraggedItem(card);
    
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = '0.5';
    }, 0);
  };

  // Drag end handler
  const handleDragEnd = (e) => {
    if (dragNode.current) {
      dragNode.current.removeEventListener('dragend', handleDragEnd);
      try { dragNode.current.style.opacity = '1'; } catch (err) {}
      dragNode.current = null;
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Drag over handler
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Drag enter handler
  const handleDragEnter = (e, targetCard) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetCard.id) return;

    setDragOverItem(targetCard);
    
    const draggedIndex = cards.findIndex(card => card.id === draggedItem.id);
    const targetIndex = cards.findIndex(card => card.id === targetCard.id);
    
    if (draggedIndex !== targetIndex) {
      const newCards = [...cards];
      newCards.splice(draggedIndex, 1);
      newCards.splice(targetIndex, 0, draggedItem);
      setCards(newCards);
    }
  };

  // Drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOverItem(null);
  };

  // Render search modal if needed

  return (
    <div className="scoreboard-container">
      <h2>Custom Scoreboard</h2>
      <button className="add-card-button" onClick={handleAddCard}>
        Add New Card
      </button>

      <div className="cards-container">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${draggedItem?.id === card.id ? 'dragging' : ''} ${dragOverItem?.id === card.id ? 'drag-over' : ''} ${expandedCards.includes(card.id) ? 'expanded' : ''}`}
            draggable
            onClick={() => toggleExpand(card.id)}
            onDragStart={(e) => handleDragStart(e, card)}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, card)}
            onDrop={handleDrop}
          >
            <div>
              {card.live && <span className="live-dot" aria-hidden="true" />}
            </div>
            <div className="card-top">
              <div className="teams">
                <div className="team-left">{card.homeTeam || card.content}</div>
                <div className={`score ${String(card.homeScore).length > 6 ? 'long' : ''}`}>
                  {card.homeScore != null && card.awayScore != null ? `${card.homeScore} — ${card.awayScore}` : (card.homeScore ?? '')}
                </div>
                <div className="team-right">{card.awayTeam || ''}</div>
              </div>
            </div>

            {/* show running time underneath the score line */}
            <div className="time-below">{formatRunningTime(card)}</div>

            {expandedCards.includes(card.id) && (
              <div className="card-details">
                {card.type === 'soccer' && (
                  <div className="soccer-stats">
                    <div>Possession: {card.stats?.possession ?? '-'}</div>
                    <div>Shots: {card.stats?.shots ?? '-'}</div>
                    <div>Fouls: {card.stats?.fouls ?? '-'}</div>
                  </div>
                )}

                {card.type === 'basketball' && (
                  <div className="basketball-stats">
                    <div>Quarters: {Array.isArray(card.stats?.quarters) ? card.stats.quarters.join(' | ') : '-'}</div>
                    <div>Turnovers: {card.stats?.turnovers ?? '-'}</div>
                  </div>
                )}

                {card.type === 'cricket' && (
                  <div className="cricket-stats">
                    <div>Overs: {card.stats?.overs ?? '-'}</div>
                    <div>Wickets: {card.stats?.wickets ?? '-'}</div>
                  </div>
                )}

                {/* generic stats fallback */}
                {(!card.type || (card.type !== 'soccer' && card.type !== 'basketball' && card.type !== 'cricket')) && (
                  <pre className="generic-stats">{JSON.stringify(card.stats || {}, null, 2)}</pre>
                )}
              </div>
            )}

            <button
              className="delete-button"
              aria-label="Remove card"
              onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {showSearch && (
        <div className="search-overlay" onClick={handleCloseSearch}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Search past matches</h3>
            <input
              type="text"
              placeholder="Search matches..."
              value={query}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-results">
              {filteredMatches.length === 0 && <div className="no-results">No matches found</div>}
              {filteredMatches.map(m => (
                <div key={m.id} className="match-item" onClick={() => handleSelectMatch(m)}>
                  <div className="match-title">{m.title}</div>
                  <div className="match-meta">{m.score} • {m.date}</div>
                </div>
              ))}
            </div>
            <button className="close-search" onClick={() => setShowSearch(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCustomScoreBoard;
