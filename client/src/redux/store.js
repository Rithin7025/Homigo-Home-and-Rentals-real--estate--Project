import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js';
import adminReducer from './admin/adminSlice.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, userReducer);



export const store = configureStore({
    reducer : {
        user : persistedReducer,
        admin : adminReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }) 
    
}) 

export const persistor = persistStore(store)