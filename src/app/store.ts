import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { counterReducer } from '@/features/counterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use AsyncStorage for React Native
import loadingReducer from '@/features/loading/loadingSlice';
import { currentCvSlice } from '@/features/CurrentCv/currentCvSlice';
import { userReducer } from '@/features/user/userSlice';

// Configure persistence for reducers
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData'], // Add the user reducer to the whitelist
};

const rootReducer = combineReducers({
  userData: userReducer, // Add persisted reducer
  counter: counterReducer,
  loading: loadingReducer,
  currentCV: currentCvSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Add the RTK Query reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware), // Add RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store); // Create persistor

export default store;
