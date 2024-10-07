import { createSlice } from '@reduxjs/toolkit';
import { fetchNannies } from './operations';

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    lastKey: null, // Хранит ключ последней загруженной записи
    hasNextPage: true, // Флаг для проверки, есть ли еще данные
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

        if (data) {
            // Преобразуем объект в массив и получаем ключи
            const items = Object.entries(data).map(([key, value]) => ({ key, ...value }));

            // Добавляем новые элементы в состояние
            state.items = [...new Map([...state.items, ...items].map((item) => [item.key, item])).values()];

            // Сохраняем последний ключ для следующей пагинации, выражение items.length - 1 используется, чтобы получить последний элемент массива items
            state.lastKey = items.length > 0 ? items[items.length - 1].key : null;

            // Проверяем, есть ли еще данные для загрузки
            state.hasNextPage = items.length > 0; // Снимаем зависимость от лимита
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