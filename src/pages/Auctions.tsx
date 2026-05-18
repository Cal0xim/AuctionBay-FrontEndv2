import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { formatMoney } from '../utils/formatMoney';
import { useError } from '../utils/ErrorDisplay';

function Auctions() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    setError(null);
    const fetchAuctions = async () => {
      try {
        const res = await api.get('/auctions');
        setAuctions(res.data.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load auctions');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Auctions</h1>

      {auctions.length === 0 ? (
        <p>No auctions available</p>
      ) : (
        auctions.map((a) => (
          <div
            key={a.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
              display: 'flex',
              gap: 15,
              alignItems: 'center',
            }}
          >
            <img
              src={a.image}
              style={{
                width: 120,
                height: 90,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>
                <Link to={`/auctions/${a.id}`}>
                  {a.title}
                </Link>
              </h3>

              <p style={{ margin: '5px 0' }}>
                {formatMoney(a.currentPrice)}
              </p>

              <p style={{ margin: 0, fontSize: 13 }}>
                Ends:{' '}
                {new Date(a.endDate).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>

              <span
                style={{
                  display: 'inline-block',
                  marginTop: 5,
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontSize: 12,
                  background:
                    a.status === 'ACTIVE' ? 'green' : 'red',
                  color: 'white',
                }}
              >
                {a.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Auctions;