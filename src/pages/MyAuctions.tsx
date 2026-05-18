import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useError } from '../utils/ErrorDisplay';

function MyAuctions() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    const fetchMyAuctions = async () => {
      try {
        const res = await api.get('/me/auction');
        setAuctions(res.data.data || res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load your auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchMyAuctions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>My Auctions</h1>

      {auctions.length === 0 ? (
        <p>You have no auctions yet</p>
      ) : (
        auctions.map((a) => (
          <div
            key={a.id}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              marginBottom: 10,
              position: 'relative',
            }}
          >

            <img
            src={a.image}
            alt={a.title}
            style={{
                width: '100%',
                maxWidth: 250,
                height: 180,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 10,
            }}
            />

            <h3>
              <Link to={`/auctions/${a.id}`}>
                {a.title}
              </Link>
            </h3>

            <p>Highest Bid: {a.currentPrice}</p>

            <p>
            Ends:{' '}
            {new Date(a.endDate).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
                })}
            </p>

            <p>Status: {a.status}</p>

            <Link
              to={`/edit-auction/${a.id}`}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                padding: '6px 10px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 4,
                textDecoration: 'none',
                fontSize: 12,
              }}
            >
              Edit
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAuctions;