import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Auctions from './pages/Auctions';
import CreateAuction from './pages/CreateAuction.tsx';
import AuctionDetail from './pages/AuctionDetail.tsx';
import MyAuctions from './pages/MyAuctions.tsx';
import EditAuction from './pages/EditAuction.tsx';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBanner from './components/ErrorBanner';


function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <ErrorBanner />
        <Routes> 
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<ProtectedRoute><CreateAuction /></ProtectedRoute>} />
        <Route path="/auctions/:id" element={<ProtectedRoute><AuctionDetail /></ProtectedRoute>} />
        <Route path="/my-auctions" element={<ProtectedRoute><MyAuctions /></ProtectedRoute>} />
        <Route path="/edit-auction/:id" element={<ProtectedRoute><EditAuction /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;