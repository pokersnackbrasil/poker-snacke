import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import authReducer from './slice/auth'
import userReducer from './slice/user'
import loadReducer from './slice/load'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  load: loadReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;