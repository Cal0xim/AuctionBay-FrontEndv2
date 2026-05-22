import type { Auction } from "../types/Auction"

const userId = Number(localStorage.getItem("userId"));

export function formatTag(a: Auction) {

  if(a.bids[0].userId == userId){
    return "Winning"
  }else{
    return "Outbid"
  }
  
  return "test";
}