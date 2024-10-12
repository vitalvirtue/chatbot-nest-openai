import React, { useEffect, useState } from 'react';
import { getUserSessions } from '../services/session.service';

const SessionList = ({ userId, shouldRefresh, onSessionSelected }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const userSessions = await getUserSessions(userId);
      setSessions(Array.isArray(userSessions) ? userSessions : []);
    };

    fetchSessions();
  }, [userId, shouldRefresh]);  // shouldRefresh değiştiğinde sohbet geçmişini yeniden yükle

  return (
    <div className="session-list">
      <h2>Chat History</h2>
      <ul>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <li key={session._id} style={{ marginBottom: '10px' }}>
              <button
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onClick={() => onSessionSelected(session._id)}
              >
                {new Date(session.createdAt).toLocaleString()}
              </button>
            </li>
          ))
        ) : (
          <p>There is no chat yet.</p>
        )}
      </ul>
    </div>
  );
};

export default SessionList;
