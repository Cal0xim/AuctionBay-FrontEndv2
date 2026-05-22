import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useError } from "../utils/ErrorDisplay";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LeftNavigation from "../components/ui/LeftNav";

function Signup() {
  const navigate = useNavigate();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { setError } = useError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await api.post("/auth/signup", {
        username: username,
        password: password,
      });

      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F6F6F4]">

      <div className="w-1/2">
        <img
          src="/src/assets/Image.png"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex justify-end">

        <div className="w-[448px] h-screen bg-white rounded-l-[32px] px-8 flex items-center">

          <div className="w-full flex flex-col justify-center items-center gap-10">

            <div className="flex justify-center">
              <LeftNavigation />
            </div>

            <div className="text-center">
              <h1 className="text-[32px] font-bold text-[#071015]">
                Hello!
              </h1>
              <p className="text-[#071015] font-light">
                Please enter your details
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">

              <Input
                label="Username"
                value={username}
                onChange={setUser}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
              />

              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign up"}
              </Button>

            </div>

            <div className="text-center text-sm">
              <span>Already have an account? </span>
               <Link
                to="/login"
                className="font-bold text-[#071015]"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;