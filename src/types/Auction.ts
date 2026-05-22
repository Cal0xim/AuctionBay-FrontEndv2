export type Auction = {
  id: number;
  title: string;
  currentPrice: number;
  image?: string;
  status: string;
  endDate: string;
  bids: any[];
  hasBid: any[];
};