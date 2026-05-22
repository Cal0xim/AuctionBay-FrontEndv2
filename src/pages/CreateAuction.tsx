import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { sanitizeString, sanitizeNumber } from "../utils/sanitize";
import { useError } from "../utils/ErrorDisplay";

function CreateAuction() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);

  const { setError } = useError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return setError("Title is required");
    if (!description.trim()) return setError("Description is required");
    if (!endDate) return setError("Please select an end date");
    if (!imageFile) return setError("Please upload an image");

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = uploadRes.data.url;

      await api.post("/me/auction", {
        title: sanitizeString(title),
        description: sanitizeString(description),
        image: imageUrl,
        startingPrice: sanitizeNumber(startingPrice),
        endDate: new Date(endDate).toISOString(),
      });

      navigate("/auctions");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create auction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-4 bg-white rounded-2xl p-4 w-[533px] shadow-xl"
      >
        <div className="flex items-center w-full">
          <h1 className="text-[23px] font-bold">Add auction</h1>
        </div>

        <div
          className="w-full h-[168px] rounded-2xl bg-[#F6F6F4] flex items-end justify-end p-4 relative overflow-hidden"
          style={
            preview
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {preview ? (
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setImageFile(null);
              }}
              className="w-12 h-10 flex items-center justify-center bg-[#272D2D] rounded-2xl"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7h12M9 7V5h6v2m-7 0l1 14h6l1-14"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              <div className="border border-[#272D2D] rounded-2xl px-4 py-2 font-medium bg-white">
                Add image
              </div>
            </label>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Write item name here"
          />

          <div className="flex flex-col gap-2 w-full">
            <p className="text-base font-light text-[#071015]">
              Description
            </p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write description here..."
              className="w-full h-[123px] border border-[#DDE9E6] rounded-2xl px-4 py-2 resize-none outline-none font-light"
            />
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <Input
                label="Starting price"
                type="number"
                value={startingPrice.toString()}
                onChange={(v: string) =>
                  setStartingPrice(Number(v))
                }
                placeholder="Price"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <p className="text-base font-light text-[#071015]">
                End date
              </p>

              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) =>
                  setEndDate(date)
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                minDate={new Date()}
                placeholderText="Select end date"
                className="w-full h-10 border border-[#DDE9E6] rounded-2xl px-4 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 w-full pt-2">
          <Button
            type="button"
            variant="tertiary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Start auction"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateAuction;