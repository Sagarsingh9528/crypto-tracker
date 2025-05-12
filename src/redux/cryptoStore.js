import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice'; // import the reducer, not the slice

const cryptoStore = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default cryptoStore;
