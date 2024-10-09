// import { ref, get, query, orderByKey, limitToFirst, startAfter } from 'firebase/database';
// import { db } from '../../utils/firebase';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// const getNannies = async (lastKey = null, limit = 3) => {

//   let nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));

//   if (lastKey) {
//     nanniesQuery = query(ref(db, '/'), orderByKey(), startAfter(lastKey), limitToFirst(limit));
//   }
//   try {
//     const snapshot = await get(nanniesQuery);
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log('Raw data from Firebase:', data);

//       return data;
//     } else {
//       console.log('No nannies available');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching nannies:', error);
//     throw error;
//   }
// };


// export const fetchNannies = createAsyncThunk(
//   'nannies/fetchNannies',
//   async ({ lastKey, limit = 3 }, { rejectWithValue }) => {
//     try {
//       const data = await getNannies(lastKey, limit);
//       console.log('Data after getNannies:', data);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



import { ref, get, query, orderByChild, orderByKey, limitToFirst, startAfter, endAt, startAt, limitToLast } from 'firebase/database';
import { db } from '../../utils/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getNannies = async ({ lastKey = null, limit = 3, filter = {} }) => {

  console.log('Received lastKey:', lastKey);  // Лог для проверки значения lastKey
  console.log('Received filter:', filter);    // Лог для проверки значения filter

  let nanniesQuery;
  if (filter.sortBy) {
    switch (filter.sortBy) {
      case 'name-asc':
        nanniesQuery = query(ref(db, '/'), orderByChild('name'), limitToFirst(limit));
        break;
      case 'name-desc':
        nanniesQuery = query(ref(db, '/'), orderByChild('name'), limitToLast(limit));
        break;
      case 'price_less_than_10':
        nanniesQuery = query(ref(db, '/'), orderByChild('price_per_hour'), endAt(10), limitToFirst(limit));
        break;
      case 'price_greater_than_10':
        nanniesQuery = query(ref(db, '/'), orderByChild('price_per_hour'), startAt(10), limitToFirst(limit));
        break;
      case 'rating-popular':
        nanniesQuery = query(ref(db, '/'), orderByChild('rating'), startAt(4), limitToFirst(limit));
        break;
      case 'rating-not-popular':
        nanniesQuery = query(ref(db, '/'), orderByChild('rating'), endAt(3), limitToFirst(limit));
        break;
      case 'show-all':
        nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));
        break;
      default:
        nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));
  }
  } else {
    nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));
  }
  
  if (lastKey) {
    nanniesQuery = query(nanniesQuery, startAfter(lastKey));
  }

  // Логирование запроса
  console.log(`Query constructed:`, nanniesQuery);

  try {
    const snapshot = await get(nanniesQuery);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Fetched data:', data);
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

export const fetchNannies = createAsyncThunk(
  'nannies/fetchNannies',
  async ({ lastKey, limit = 3, filter = {} }, { rejectWithValue }) => {
    try {
      const data = await getNannies({ lastKey, limit, filter });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




// import { ref, get, query, limitToFirst, startAfter, orderByKey } from 'firebase/database';
// import { db } from '../../utils/firebase';
// import { createAsyncThunk } from '@reduxjs/toolkit';


// const getNannies = async (lastKey = null, limit = 3) => {
//   let nanniesQuery = query(ref(db, '/'), orderByKey(), limitToFirst(limit));
  
//   if (lastKey) {
//     nanniesQuery = query(ref(db, '/'), orderByKey(), startAfter(lastKey), limitToFirst(limit));
//   }

//   try {
//     const snapshot = await get(nanniesQuery);
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log('Raw data from Firebase:', data);
//       return Object.values(data);
//     } else {
//       console.log('No nannies available');
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching nannies:', error);
//     throw error;
//   }
// };

// export const fetchNannies = createAsyncThunk(
//   'nannies/fetchNannies',
//   async ({ lastKey, limit = 3, filter }, { rejectWithValue }) => {
//     try {

//       const data = await getNannies(lastKey, limit);
//       console.log('Data from Firebase:', data); 

//       data.forEach(item => {
//   console.log('Item:', item);
// });

//       let filteredData = data || [];

//       console.log('Filtered data:', filteredData);
//       console.log('Fetched Nannies:', data);

//       // Фильтрация по цене
//       if (filter === 'price_less_than_10') {
//         filteredData = filteredData.filter(nanny => nanny.price_per_hour < 10);
//       } else if (filter === 'price_greater_than_10') {
//         filteredData = filteredData.filter(nanny => nanny.price_per_hour > 10);
//       }

//       console.log('Filtered Nannies:', filteredData); 

//       // Сортировка по имени
//       if (filter === 'name-asc') {
//         filteredData.sort((a, b) => a.name.localeCompare(b.name));
//       } else if (filter === 'name-desc') {
//         filteredData.sort((a, b) => b.name.localeCompare(a.name));
//       }

//       // Сортировка по рейтингу
//       if (filter === 'popular') {
//         filteredData.sort((a, b) => b.rating - a.rating);
//       } else if (filter === 'not-popular') {
//         filteredData.sort((a, b) => a.rating - b.rating);
//       }

//       const newLastKey = filteredData.length > 0 ? filteredData[filteredData.length - 1].key : null;

//       return { filteredData, lastKey: newLastKey }; // Возвращаем как lastKey
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );