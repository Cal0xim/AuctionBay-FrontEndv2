import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

import NavBar from "../components/ui/NavBar";
import Tag from "../components/ui/Tag";
import TimeTag from "../components/ui/TimeTag";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { formatMoney } from "../utils/formatMoney";
import { useError } from "../utils/ErrorDisplay";
import { formatTime } from "../utils/formatTime";
import { getTimeVariant } from "../utils/timeVariant";

function AuctionDetail() {
  const { id } = useParams();

  const [auction, setAuction] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<string>("");

  const { setError } = useError();

  const [loading, setLoading] = useState(true);
  const [loadingBid, setLoadingBid] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await api.get(`/auctions/${id}`);
        setAuction(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  const handleBid = async () => {
    setError(null);

    const amount = Number(bidAmount);

    if (!amount || amount <= auction.currentPrice) {
      setError(`Bid must be higher than ${auction.currentPrice}`);
      return;
    }

    setLoadingBid(true);

    try {
      await api.post(`/auctions/${id}/bid`, { amount });

      const res = await api.get(`/auctions/${id}`);
      setAuction(res.data);

      setBidAmount("");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Bid failed");
    } finally {
      setLoadingBid(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!auction) return <div className="p-8">Auction not found</div>;

  const isEnded = auction.status !== "ACTIVE";

  const sortedBids = [...(auction.bids || [])].sort(
    (a, b) => b.amount - a.amount
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F4]">
      <NavBar activeTab="right" />

      <div className="flex px-8 pt-[120px] pb-8 gap-4">

        <div className="flex-1">
          <img
            src={auction.image || "/placeholder_auction.png"}
            className="w-full h-[888px] object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-4 w-[680px]">

          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">

            <div className="flex justify-between items-center">
              <Tag variant={auction.status === "ACTIVE" ? "InProgress" : "Done"} />

              <TimeTag
                time={formatTime(auction.endDate)}
                variant={getTimeVariant(auction.endDate)}
              />
            </div>

            <h1 className="text-[32px] font-bold">
              {auction.title}
            </h1>

            <p className="text-base font-light leading-6">
              {auction.description}
            </p>

            <h2 className="text-2xl font-semibold">
              {formatMoney(auction.currentPrice)}
            </h2>

            {!isEnded && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <span>Bid:</span>

                <Input
                  type="number"
                  value={bidAmount}
                  onChange={setBidAmount}
                  placeholder={String(auction.currentPrice + 1) + "€"}
                />

                <Button onClick={handleBid} disabled={loadingBid}>
                  {loadingBid ? "Placing..." : "Place bid"}
                </Button>
              </div>
            )}

            {isEnded && (
              <p className="text-red-500 mt-2">
                Auction has ended
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">

            <h3 className="text-[23px] font-bold">
              Bidding history ({auction._count?.bids})
            </h3>

            <div className="flex flex-col">

              {sortedBids.map((bid: any) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between py-2 border-b border-[#EDF4F2]"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={bid.user?.image || "/placeholderPFP.png"}
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <p className="text-base font-light">
                      {bid.user?.username || "Unknown user"}
                    </p>

                  </div>

                  <p className="text-base font-light">
                    {new Date(bid.createdAt).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-1 px-4 py-1.5 bg-[#F4FF47] rounded-2xl">
                    <p className="font-semibold text-[#272D2D]">
                      {bid.amount}
                    </p>

                    <span className="text-[#272D2D]">€</span>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AuctionDetail;