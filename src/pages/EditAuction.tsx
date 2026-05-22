import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useError } from '../utils/ErrorDisplay';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditAuction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setError } = useError();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await api.get(`/auctions/${id}`);
        const auction = res.data;

        setTitle(auction.title || '');
        setDescription(auction.description || '');
        setPreview(auction.image || null);
        setEndDate(auction.endDate ? new Date(auction.endDate) : null);
      } catch (err: any) {
        console.log('LOAD AUCTION ERROR:', err?.response?.data);
        setError(err?.response?.data?.message || 'Failed to load auction');
      } finally {
        setFetching(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return setError('Title is required');
    if (!description.trim()) return setError('Description is required');

    setLoading(true);
    setError(null);

    try {
      let imageUrl = preview;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadRes = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = uploadRes.data.url;
      }

      await api.put(`/me/auction/${id}`, {
        title,
        description,
        image: imageUrl,
        endDate: endDate ? endDate.toISOString() : null,
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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 bg-white rounded-2xl p-4 w-[533px] shadow-xl"
      >
        <h1 className="text-[23px] font-bold">Edit auction</h1>

        <div
          className="w-full h-[168px] rounded-2xl bg-[#F6F6F4] flex items-end justify-end p-4 relative overflow-hidden"
          style={
            preview
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {preview ? (
            <button
              type="button"
              onClick={removeImage}
              className="w-12 h-10 flex items-center justify-center bg-[#272D2D] rounded-2xl"
            >
              🗑
            </button>
          ) : (
            <label className="cursor-pointer border px-4 py-2 rounded-2xl">
              Add image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
          )}
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded-xl"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded-xl h-28"
        />

        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-light text-[#071015]">
            End date
          </label>

          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
            className="w-full border p-2 rounded-xl"
          />
        </div>

        <div className="flex justify-end gap-4 w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAuction;