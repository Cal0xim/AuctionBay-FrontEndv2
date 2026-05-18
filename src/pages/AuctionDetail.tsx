import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { formatMoney } from '../utils/formatMoney';
import { useError } from '../utils/ErrorDisplay';

function AuctionDetail() {
  const { id } = useParams();

  const [auction, setAuction] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const {setError } = useError();
  const [loading, setLoading] = useState(true);
  const [loadingBid, setLoadingBid] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await api.get(`/auctions/${id}`);
        setAuction(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleBid = async () => {
    setError(null);

    const amount = Number(bidAmount);

    if (!amount || amount <= auction.currentPrice) {
      setError(`Bid must be higher than ${auction.currentPrice}`);
      return;
    }

    setLoadingBid(true);

    try {
      await api.post(`/auctions/${id}/bid`, { amount });

      const res = await api.get(`/auctions/${id}`);
      setAuction(res.data);

      setBidAmount('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Bid failed');
    } finally {
      setLoadingBid(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!auction) return <p>Auction not found</p>;

  const isEnded = auction.status !== 'ACTIVE';

  const sortedBids = [...(auction.bids || [])].sort(
    (a, b) => b.amount - a.amount
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>{auction.title}</h1>

      {/* MAIN LAYOUT */}
      <div style={{ display: 'flex', gap: 30, marginTop: 20 }}>
        
        {/* LEFT SIDE - IMAGE */}
        <div style={{ flex: 1 }}>
          <img
            src={auction.image}
            alt={auction.title}
            style={{
              width: '100%',
              maxWidth: 500,
              height: 350,
              objectFit: 'cover',
              borderRadius: 10,
            }}
          />
        </div>

        {/* RIGHT SIDE - INFO */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 16 }}>{auction.description}</p>

          <h2>{formatMoney(auction.currentPrice)}</h2>

          <p>
            Ends:{' '}
            {new Date(auction.endDate).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>

          <span
            style={{
              display: 'inline-block',
              padding: '5px 10px',
              borderRadius: 6,
              background: auction.status === 'ACTIVE' ? 'green' : 'red',
              color: 'white',
              fontSize: 12,
            }}
          >
            {auction.status}
          </span>

          {auction.status !== 'ACTIVE' && (
            <p style={{ marginTop: 10 }}>
              Winner:{"🏆 "}
              <strong>
                {auction.winner?.username || 'No bids'}
              </strong>
            </p>
          )}

          <p style={{ marginTop: 10 }}>
            Bids: {auction._count?.bids ?? sortedBids.length}
          </p>

          <hr />

          {!isEnded && (
            <div style={{ marginTop: 20 }}>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{ padding: 8, width: 200 }}
                placeholder="Enter bid amount"
              />

              <button
                onClick={handleBid}
                disabled={
                  loadingBid ||
                  !bidAmount ||
                  Number(bidAmount) <= auction.currentPrice
                }
                style={{
                  marginLeft: 10,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  opacity:
                    loadingBid ||
                    !bidAmount ||
                    Number(bidAmount) <= auction.currentPrice
                      ? 0.5
                      : 1,
                }}
              >
                {loadingBid ? 'Placing bid...' : 'Place Bid'}
              </button>

            </div>
          )}

          {isEnded && (
            <p style={{ color: 'red', marginTop: 20 }}>
              Auction has ended
            </p>
          )}
        </div>
      </div>

      {/* BID HISTORY */}
      <hr style={{ marginTop: 30 }} />

      <h3>Bid History</h3>

      {sortedBids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        sortedBids.map((bid: any, index: number) => {
          let fontSize = '14px';

          if (index === 0) fontSize = '28px';
          else if (index === 1) fontSize = '20px';
          else if (index === 2) fontSize = '16px';

          return (
            <div
              key={bid.id}
              style={{
                padding: 8,
                borderBottom: '1px solid #eee',
                fontSize,
                fontWeight: index === 0 ? 'bold' : 'normal',
                background: index === 0 ? '#e8fff0' : 'transparent',
              }}
            >
              {formatMoney(bid.amount)}
            </div>
          );
        })
      )}
    </div>
  );
}

export default AuctionDetail;