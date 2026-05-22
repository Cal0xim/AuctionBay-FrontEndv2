AuctionBay Frontend

Frontend application for AuctionBay — a full-stack auction platform
built with React and TypeScript.

This project requires the AuctionBay backend API to function.

Backend repository: https://github.com/Cal0xim/AuctionBay-BackEnd

Backend API is responsible for authentication, auctions, bidding, and
data storage.

------------------------------------------------------------------------

🚀 Features

-   User authentication (JWT login / signup)
-   Browse active auctions
-   Create new auction listings
-   Edit / delete own auctions
-   Upload auction images
-   Place bids on auctions
-   View auction status (active / ended)
-   Real-time bid updates (via API refresh)
-   User bidding status (winning / losing / not participated)

------------------------------------------------------------------------

🛠 Tech Stack

-   React
-   TypeScript
-   React Router
-   Axios
-   Context API
-   CSS / Tailwind (depending on setup)

------------------------------------------------------------------------

📦 Installation

1. Clone repository

git clone cd auction-bay-frontend

2. Install dependencies

npm install

3. Setup environment variables

Create a .env file:

VITE_API_URL=http://localhost:3000

------------------------------------------------------------------------

4. Start development server

npm run dev

Frontend runs on: http://localhost:5173

------------------------------------------------------------------------

🔗 Backend Requirement

⚠️ This frontend will NOT work without the backend running.

Make sure to:

1.  Start the backend server
2.  Configure correct API URL in .env
3.  Run PostgreSQL database
4.  Ensure JWT authentication is enabled

------------------------------------------------------------------------

🌐 Project Architecture

React Frontend ↓ HTTP (Axios) NestJS Backend API ↓ Prisma ORM PostgreSQL
Database

------------------------------------------------------------------------

📡 Main Pages

-   Home (Auction list)
-   Auction Details
-   Create Auction
-   Edit Auction
-   My Auctions
-   My Bids

------------------------------------------------------------------------

🧠 Notes

-   All data is fetched from backend API
-   Authentication uses JWT stored in localStorage
-   Image upload is handled via backend endpoint
-   Auction status updates based on backend logic
