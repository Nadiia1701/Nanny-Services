import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'Show all', // по умолчанию
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;