import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userSlice.js";
import globalReducer from "./reducers/globalSlice.js";
import {api} from "./services/api.js";

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    user: userReducer,
    global: globalReducer,
})

const rootReducer = (state, action) => {
    if (action.type === "/auth/signout") {
        storage.removeItem("persist:root");
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(api.middleware)
    }
});

export const persistor = persistStore(store);