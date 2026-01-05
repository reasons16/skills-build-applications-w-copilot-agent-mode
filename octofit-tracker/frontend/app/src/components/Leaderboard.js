import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        setLoading(false);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading Leaderboard...</div>;
  if (!leaderboard.length) return <div className="alert alert-info">No leaderboard data found.</div>;
  const columns = leaderboard[0] ? Object.keys(leaderboard[0]) : [];
  return (
    <div>
      <h2 className="mb-4 text-primary">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                {columns.map(col => <td key={col}>{String(entry[col])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
