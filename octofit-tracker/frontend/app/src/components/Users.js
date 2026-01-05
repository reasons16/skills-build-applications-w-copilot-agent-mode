import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        setLoading(false);
        console.log('Fetched Users:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching users:', err);
      });
  }, [endpoint]);

  if (loading) return <div className="text-center my-4">Loading Users...</div>;
  if (!users.length) return <div className="alert alert-info">No users found.</div>;
  const columns = users[0] ? Object.keys(users[0]) : [];
  return (
    <div>
      <h2 className="mb-4 text-primary">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                {columns.map(col => <td key={col}>{String(user[col])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
