import { ref, get, query, orderByKey, limitToFirst, startAfter } from 'firebase/database';
import { db } from '../../utils/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getNannies = async (lastKey = null, limit = 3) => {
  // Создаем запрос с лимитом и сортировкой по ключу
  let nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));
  // Если передан последний ключ, используем его для начала следующей страницы
  if (lastKey) {
    nanniesQuery = query(ref(db, '/'), orderByKey(), startAfter(lastKey), limitToFirst(limit));
  }
  try {
    const snapshot = await get(nanniesQuery);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Метод val() в Firebase Realtime Database используется для извлечения данных из снимка (snapshot), полученного с помощью методов, таких как get(), onValue(), или других событийных обработчиков.
      return data;
    } else {
      console.log('No nannies available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching nannies:', error);
    throw error;
  }
};

// Thunk для запроса данных с пагинацией
export const fetchNannies = createAsyncThunk(
  'nannies/fetchNannies', 
  async ({ lastKey, limit = 3 }, { rejectWithValue }) => {
    try {
      const data = await getNannies(lastKey, limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);