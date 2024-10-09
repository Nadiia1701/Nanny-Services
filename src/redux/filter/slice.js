import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'show-all', // начальное значение, чтобы показывать все данные без фильтрации
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilter: (state) => {
      state.sortBy = 'show-all'; // сброс фильтра к начальному значению
    }
  }
});

export const { setSortBy, resetFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

