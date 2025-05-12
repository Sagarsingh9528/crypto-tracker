import React, { useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { setCryptoData, updateCryptoPrices } from "../redux/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";

function CryptoCard() {
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.crypto.data);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const res = await fetch("https://openapiv1.coinstats.app/coins", {
          headers: {
            accept: "application/json",
            "X-API-KEY": "fCe/yOx0Gud4LC1HgzME4Xu04uBkVHJ7KhJ9taGLBJw=",
          },
        });
        const data = await res.json();
        dispatch(setCryptoData(data.result.slice())); // Optional: limit to 10
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(() => {
      dispatch(updateCryptoPrices());
    }, 1500);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
        <thead className="bg-gray-100 font-semibold text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">#</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Price</th>
            <th className="py-3 px-4 border-b">1h %</th>
            <th className="py-3 px-4 border-b">24h %</th>
            <th className="py-3 px-4 border-b">7d %</th>
            <th className="py-3 px-4 border-b">Market Cap</th>
            <th className="py-3 px-4 border-b items-center gap-1">
              Volume (24h) <BsFillInfoCircleFill className="text-gray-500" />
            </th>
            <th className="py-3 px-4 border-b  items-center gap-1">
              Circulating Supply <BsFillInfoCircleFill className="text-gray-500" />
            </th>
            <th className="py-3 px-4 border-b">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {crypto.map((coin, index) => (
            <tr key={coin.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{index + 1}</td>
              <td className="py-3 px-4 border-b flex items-center gap-2">
                <img src={coin.icon} alt={coin.name} className="w-5 h-5" />
                <span>{coin.name}</span>
                <span className="text-gray-400 text-xs">({coin.symbol})</span>
              </td>
              <td className="py-3 px-4 border-b">${coin.price.toFixed(2)}</td>
              <td className={`py-3 px-4 border-b ${coin.priceChange1h < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {coin.priceChange1h?.toFixed(2)}%
              </td>
              <td className={`py-3 px-4 border-b ${coin.priceChange1d < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {coin.priceChange1d?.toFixed(2)}%
              </td>
              <td className={`py-3 px-4 border-b ${coin.priceChange1w < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {coin.priceChange1w?.toFixed(2)}%
              </td>
              <td className="py-3 px-4 border-b">${(coin.marketCap / 1e9).toFixed(2)} B</td>
              <td className="py-3 px-4 border-b">${(coin.volume / 1e6).toFixed(2)} M</td>
              <td className="py-3 px-4 border-b">{coin.totalSupply?.toLocaleString()}</td>
              <td className="py-3 px-4 border-b">📈</td> {/* Sparkline placeholder */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoCard;
