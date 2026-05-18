import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useError } from "../utils/ErrorDisplay";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Logo from "../components/ui/Logo";
import LeftNavigation from "../components/ui/LeftNavigation";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { setError } = useError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await api.post("/auth/signup", {
        name,
        surname,
        email,
        password,
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

      {/* LEFT IMAGE */}
      <div className="w-1/2">
        <img src="/src/assets/Image.png" className="w-full h-full object-cover" />
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="w-[448px] bg-white rounded-[32px] p-8 flex flex-col gap-10">

          {/* LOGO */}
          <div className="flex justify-center">
            <LeftNavigation />
          </div>

          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-[32px] font-bold text-[#071015]">
              Hello!
            </h1>
            <p className="text-[#071015] font-light">
              Please enter your details
            </p>
          </div>

          {/* INPUTS */}
          <div className="flex flex-col gap-4">

            <div className="flex gap-4">
              <Input label="Name" value={name} onChange={setName} />
              <Input label="Surname" value={surname} onChange={setSurname} />
            </div>

            <Input label="E-mail" value={email} onChange={setEmail} />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            <Input
              label="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={setRepeatPassword}
            />

            {/* BUTTON */}
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </Button>

          </div>

          {/* FOOTER */}
          <div className="text-center text-sm">
            <span>Already have an account? </span>
            <span className="font-bold cursor-pointer">
              Log in
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;