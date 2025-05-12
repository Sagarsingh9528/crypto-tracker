import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action) => {
      state.data = action.payload;
    },
    updateCryptoPrices: (state) => {
      state.data = state.data.map((coin) => {
        const randomChange = () => (Math.random() * 2 - 1).toFixed(2); // -1% to +1%
        const priceChange = parseFloat(randomChange());
        const newPrice = +(coin.price * (1 + priceChange / 100)).toFixed(2);

        return {
          ...coin,
          price: newPrice,
          priceChange1h: priceChange,
          priceChange1d: +(coin.priceChange1d + priceChange / 2).toFixed(2),
          volume: +(coin.volume * (1 + Math.random() * 0.1)).toFixed(2),
        };
      });
    },
  },
});

export const { setCryptoData, updateCryptoPrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
