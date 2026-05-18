import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { useError } from '../utils/ErrorDisplay';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setError } = useError();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        username,
        password,
      });

      const token = res.data.access_token;

      
      localStorage.setItem('token', token);

      navigate('/auctions');
    } catch (err: any) {
        setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <div style={{ marginTop: 10 }}>
          <p>or</p>
          <Link to="/signup">Create account</Link>
        </div>

      </form>
    </div>
  );
}

export default Login;