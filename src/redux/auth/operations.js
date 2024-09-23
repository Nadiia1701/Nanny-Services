import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

// Регистрация пользователя
export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { email: user.email, uid: user.uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логин пользователя
export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { email: user.email, uid: user.uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логаут пользователя
export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Обновление данных пользователя
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (user) {
        return { email: user.email, uid: user.uid };
      } else {
        return thunkAPI.rejectWithValue("No user is logged in");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);