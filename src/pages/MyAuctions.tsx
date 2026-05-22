import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

import NavBar from "../components/ui/NavBar";
import Card from "../components/ui/Card";
import Tab from "../components/ui/Tab";

import type { Auction } from "../types/Auction";

import { useError } from "../utils/ErrorDisplay";

type TabType = "mine" | "bidding" | "won";

export default function MyAuctions() {
  const [tab, setTab] = useState<TabType>("mine");
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const { setError } = useError();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url =
          tab === "mine"
            ? "/me/auction"
            : tab === "bidding"
            ? "/me/bids"
            : "/me/won";

        const res = await api.get(url);
        setAuctions(res.data.data || res.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F4]">
      <NavBar activeTab="right" />

      <div className="flex flex-col gap-4 pt-[174px] flex-1">

        <div className="px-8">
          <Tab
            tabs={[
              { label: "My auctions" },
              { label: "Bidding" },
              { label: "Won" },
            ]}
            activeIndex={tab === "mine" ? 0 : tab === "bidding" ? 1 : 2}
            onChange={(i) =>
              setTab(i === 0 ? "mine" : i === 1 ? "bidding" : "won")
            }
          />
        </div>

        <div className="flex flex-wrap gap-4 px-8 pb-8">

          {loading ? (
            <p>Loading...</p>
          ) : auctions.length === 0 ? (
            <p>No auctions found</p>
          ) : (
            auctions.map((a) =>
              tab === "mine" ? (
                <Card
                  key={a.id}
                  a={a}
                  variant="editable"
                />
              ) : (
                <Link key={a.id} to={`/auctions/${a.id}`}>
                  <Card a={a} />
                </Link>
              )
            )
          )}

        </div>
      </div>
    </div>
  );
}