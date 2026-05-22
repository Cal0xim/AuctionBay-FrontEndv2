import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useError } from "../../utils/ErrorDisplay";
import { useUser } from "../../utils/UserContext";

type Props = {
  onClose: () => void;
};

export default function ProfileMenu({ onClose }: Props) {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"profile" | "password" | "pfp">("profile");

  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
    const { refreshUser } = useUser();


  const { setError } = useError();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/me");
        setUsername(res.data.username);
        setPreview(res.data.image);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await api.patch("/me", {
        username,
      });

      setUsername(res.data.username);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setSaving(true);
      setError(null);

      if (newPassword !== repeatPassword) {
        setError("Passwords do not match");
        return;
      }

      await api.patch("/me/update-password", {
        currentPassword,
        password: newPassword,
      });

      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

    const handleUploadImage = async () => {
    if (!file) return;

    try {
        setSaving(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        await api.post("/me/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });

        await refreshUser();
        onClose();
    } catch (err: any) {
        setError(err?.response?.data?.message || "Upload failed");
    } finally {
        setSaving(false);
    }
    };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/30 z-40" />

      <div className="fixed left-20 top-20 z-50 w-[533px] bg-white rounded-2xl p-4 flex flex-col gap-8 shadow-lg">

        {mode === "profile" && (
          <>
            <h2 className="text-[23px] font-bold">Profile settings</h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col gap-4">
                <Input
                  label="Username"
                  value={username}
                  onChange={setUsername}
                />

                <button
                  onClick={() => setMode("password")}
                  className="text-left font-medium hover:underline"
                >
                  Change password
                </button>

                <button
                  onClick={() => setMode("pfp")}
                  className="text-left font-medium hover:underline"
                >
                  Change profile picture
                </button>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-2xl bg-red-500 text-white font-medium"
              >
                Logout
              </button>
            </div>
          </>
        )}

        {mode === "password" && (
          <>
            <h2 className="text-[23px] font-bold">Change password</h2>

            <div className="flex flex-col gap-[17px]">
              <Input
                label="Current password"
                type="password"
                value={currentPassword}
                onChange={setCurrentPassword}
              />

              <Input
                label="New password"
                type="password"
                value={newPassword}
                onChange={setNewPassword}
              />

              <Input
                label="Repeat new password"
                type="password"
                value={repeatPassword}
                onChange={setRepeatPassword}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={() => setMode("profile")}>
                Back
              </Button>

              <Button onClick={handlePasswordChange} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </>
        )}

        {mode === "pfp" && (
          <>
            <h2 className="text-[23px] font-bold">
              Change profile picture
            </h2>

            <div className="flex flex-col items-center gap-4">
              <img
                src={preview || "/Avatar.png"}
                className="w-14 h-14 rounded-full object-cover"
              />

              <label className="border border-[#272D2D] px-4 py-2 rounded-2xl font-medium cursor-pointer">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={() => setMode("profile")}>
                Cancel
              </Button>

              <Button
                onClick={handleUploadImage}
                disabled={!file || saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}