import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', gap: 15 }}>
        <Link to="/auctions">All Auctions</Link>
        <Link to="/create">Create Auction</Link>
        <Link to="/my-auctions">My Auctions</Link>
      </div>

      {token ? (
        <button onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;