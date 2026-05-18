import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useError } from '../utils/ErrorDisplay';

function EditAuction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setError } = useError();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await api.get(`/me/auction/${id}`);
        const auction = res.data

        if (!auction) {
          setError('Auction not found');
          return;
        }

        setTitle(auction.title);
        setDescription(auction.description);
        setImage(auction.image || '');
      } catch (err) {
        setError('Failed to load auction');
      } finally {
        setFetching(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put(`/me/auction/${id}`, {
        title,
        description,
        image,
      });

      navigate('/my-auctions');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading auction...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Auction</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <br />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />

        <br />

        <button disabled={loading}>
          {loading ? 'Updating...' : 'Update Auction'}
        </button>
      </form>
    </div>
  );
}

export default EditAuction;