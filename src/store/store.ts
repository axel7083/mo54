import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import piecesReducer from './features/pieces/piecesSlice';
import vehiclesReducer from './features/vehicles/vehiclesSlice';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        pieces: piecesReducer,
        vehicles: vehiclesReducer,
        cart: cartReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false, // We know what we are doing
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
