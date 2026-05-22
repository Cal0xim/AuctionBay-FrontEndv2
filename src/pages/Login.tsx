import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useError } from "../utils/ErrorDisplay";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LeftNavigation from "../components/ui/LeftNav";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setError } = useError();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const me = await api.get("/me");

      localStorage.setItem("userId", String(me.data.userId));
      localStorage.setItem("username", me.data.username);

      navigate("/auctions");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-[#F6F6F4] overflow-hidden">

      <div className="w-1/2 h-full">
        <img
          src="/src/assets/Image.png"
          className="w-full h-full object-cover"
          alt="Image"
        />
      </div>

      <div className="w-1/2 flex justify-end">
        <div className="w-[448px] h-screen bg-white rounded-l-[32px] px-8 flex items-center">

          <div className="w-[448px] bg-white rounded-[32px] p-8 flex flex-col gap-10">

            <div className="flex justify-center">
              <LeftNavigation />
            </div>

            <div className="text-center">
              <h1 className="text-[32px] font-bold text-[#071015]">
                Welcome back!
              </h1>
              <p className="text-[#071015] font-light">
                Please enter your details
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">

              <Input
                label="Username"
                value={username}
                onChange={setUsername}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
              />

              <Button variant="primary" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

            </form>

            <div className="text-center text-sm">
              <p className="text-[#74817F]">or</p>

              <Link to="/signup" className="font-bold text-[#071015]">
                Create account
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;