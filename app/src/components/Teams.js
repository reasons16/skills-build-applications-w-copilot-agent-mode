import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        setLoading(false);
        console.log('Fetched Teams:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching teams:', err);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading Teams...</div>;
  if (!teams.length) return <div className="alert alert-info">No teams found.</div>;
  const columns = teams[0] ? Object.keys(teams[0]) : [];
  return (
    <div>
      <h2 className="mb-4 text-primary">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                {columns.map(col => <td key={col}>{String(team[col])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
