import { SupportedChainId } from "@symmio/frontend-sdk/constants/chains";
import { Hedger, OpenInterest } from "@symmio/frontend-sdk/types/hedger";

export const DEFAULT_HEDGER = {
  apiUrl: "https://fapi.binance.com/",
  webSocketUrl: "wss://fstream.binance.com/stream",
  baseUrl: "https://alpha-hedger2.rasa.capital",
  webSocketUpnlUrl: "",
  webSocketNotificationUrl: "",
  defaultMarketId: 1,
  markets: [],
  openInterest: { total: 0, used: 0 },
  id: "Thena",
  fetchData: false,
} as Hedger;

export const HedgerInfo = {
  [SupportedChainId.BSC]: [
    {
      apiUrl: "https://fapi.binance.com/",
      webSocketUrl: "wss://fstream.binance.com/stream",
      baseUrl: `https://${process.env.NEXT_PUBLIC_BSC_HEDGER_URL}`,
      webSocketUpnlUrl: `wss://${process.env.NEXT_PUBLIC_BSC_HEDGER_URL}/ws/upnl-ws`,
      webSocketNotificationUrl: `wss://${process.env.NEXT_PUBLIC_BSC_HEDGER_URL}/ws/position-state-ws3`,
      defaultMarketId: 1,
      markets: [],
      openInterest: { total: 0, used: 0 } as OpenInterest,
      id: "alpha-hedger2",
      fetchData: true,
      clientName: "THENA",
    },
  ],
  [SupportedChainId.NOT_SET]: [DEFAULT_HEDGER],
};
