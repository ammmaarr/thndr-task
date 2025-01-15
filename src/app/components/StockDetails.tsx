import { useEffect, useState } from "react";
import { StockItem } from "../interfaces";

const StockDetails: React.FC<{
  ticker: string;
  updateShowDetails: (ticker: string) => void;
}> = ({ ticker, updateShowDetails }) => {
  const [item, setItem] = useState<StockItem | null>(null);

  useEffect(() => {
    const fetchDetails = async (ticker: string) => {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=fIVeVEZJ8Lnc_YlVes0VZiEteb0iuVlb`
      );

      const data = await response.json();
      setItem(data.results);
      return data.results;
    };

    fetchDetails(ticker);
  }, [ticker]);

  const ItemLabel: React.FC<{ itemKey: string; text: string | undefined }> = ({
    itemKey,
    text,
  }) => {
    return (
      text && (
        <label
          className="tracking-widest text-xl"
          key={itemKey}
        >{`${itemKey}: ${text}`}</label>
      )
    );
  };

  return (
    item && (
      <div className="fixed max-h-3/4 max-w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.95)] z-20 text-white p-20 rounded-lg flex flex-col justify-center uppercase gap-4">
        <label
          className="absolute top-10 right-10 text-white cursor-pointer"
          onClick={() => updateShowDetails("")}
        >
          X
        </label>

        <ItemLabel itemKey="ticker" text={item.ticker} />
        <ItemLabel itemKey="name" text={item.name} />
        <ItemLabel itemKey="locale" text={item.locale} />
        <ItemLabel itemKey="cik" text={item.cik} />
        <ItemLabel itemKey="market" text={item.market} />
        <ItemLabel itemKey="primary_exchange" text={item.primary_exchange} />
      </div>
    )
  );
};

export default StockDetails;
