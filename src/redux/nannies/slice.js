import { createSlice } from '@reduxjs/toolkit';
import { fetchNannies } from './operations';

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    lastKey: null,
    hasNextPage: true,
  },
  reducers: {
    resetNannies: (state) => {
      state.items = [];
      state.lastKey = null;
      state.hasNextPage = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNannies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;        
        const data = action.payload;

        console.log('Data in Fulfilled:', data);

        if (data) {

            const items = Object.entries(data).map(([key, value]) => ({ key, ...value }));

            state.items = [...new Map([...state.items, ...items].map((item) => [item.key, item])).values()];

            state.lastKey = items.length > 0 ? items[items.length - 1].key : null;
          
            state.hasNextPage = items.length > 0;
          
        } else {         
            state.hasNextPage = false;
        }
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetNannies } = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;