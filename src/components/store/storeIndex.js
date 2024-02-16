import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import filteredHistoryNotSlice from './slices/filteredHistoryNotSlice';

import { 
   persistStore, 
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 
const rootReducer = combineReducers({
   user: userReducer,
   filteredHistoryNot: filteredHistoryNotSlice,
});

const persistConfig = {
   key: 'root',
   storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH,
               REHYDRATE,
               PAUSE,
               PERSIST,
               PURGE,
               REGISTER, 
            ],
         },
      }),
})

export const persistor = persistStore(store);
export default store;