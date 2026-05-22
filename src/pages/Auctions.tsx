import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useError } from "../utils/ErrorDisplay";
import type { Auction } from "../types/Auction"

import NavBar from "../components/ui/NavBar";
import Card from "../components/ui/Cardv2";

function Auctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    setError(null);

    const fetchData = async () => {
      try {
        const res = await api.get("/auctions");
        const mineRes = await api.get("/me/auction");

        const mine: Auction[] = mineRes.data.data || mineRes.data;
        const myIds = new Set<number>(mine.map((a) => Number(a.id)));

        const filtered = (res.data.data || res.data).filter(
          (a: Auction) => !myIds.has(Number(a.id))
        );

        setAuctions(filtered);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F4]">
      <NavBar activeTab="left" />

      <div className="flex flex-col gap-4 pt-4 flex-1 overflow-y-auto">
        <div className="px-8">
          <h1 className="text-[32px] font-bold">Auctions</h1>
        </div>

        <div className="flex flex-wrap gap-4 px-8 pb-8">
          {auctions.length === 0 ? (
            <p>No auctions available</p>
          ) : (
            auctions.map((a) => (
              <Link key={a.id} to={`/auctions/${a.id}`}>
                <Card a = {a}/>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Auctions;