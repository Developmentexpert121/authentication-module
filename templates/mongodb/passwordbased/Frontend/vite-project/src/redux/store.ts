  import { configureStore } from '@reduxjs/toolkit';
  import AuthState from './authSilces';
//   import AuthEmail from './EmailverificationSilce';

  import {  useDispatch, useSelector } from 'react-redux';
  import type {TypedUseSelectorHook}from 'react-redux';
  // Configure store
  export const store = configureStore({
    reducer: {
      user: AuthState,
    },
  });

  // Infer RootState and AppDispatch types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

  // Typed hooks for usage in your components
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
