export interface StockItem {
  ticker: string;
  name: string;
  locale?: string;
  market?: string;
  primary_exchange?: string;
  cik?: string;
}

export interface ApiResponse {
  results: StockItem[];
  next_url?: string;
}
