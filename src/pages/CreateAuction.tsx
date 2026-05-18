import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sanitizeString } from '../utils/sanitize';
import { sanitizeNumber } from '../utils/sanitize';
import api from '../api/axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useError } from '../utils/ErrorDisplay';


function CreateAuction() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { setError } = useError();


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (!endDate) {
            setError("Please select a valid end date");
            return;
        }

    setLoading(true);
    setError(null);

    try {
      await api.post('/me/auction', {
        title: sanitizeString(title),
        description: sanitizeString(description),
        image: sanitizeString(image),
        startingPrice: sanitizeNumber(startingPrice),
        endDate: new Date(endDate).toISOString(),
    });

      navigate('/auctions');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'Failed to create auction'
      );
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Auction</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />

        <input
          type="number"
          placeholder="Starting Price"
          value={startingPrice}
          onChange={(e) =>
            setStartingPrice(Number(e.target.value))
          }
        />
        
        <br />

        <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
        />

        <br />

        <button disabled={loading}>
          {loading ? 'Creating...' : 'Create Auction'}
        </button>
      </form>
    </div>
  );
}

export default CreateAuction;