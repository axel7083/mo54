import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import piecesReducer from './features/pieces/piecesSlice';
import vehiclesReducer from './features/vehicles/vehiclesSlice';

export const store = configureStore({
  reducer: {
    pieces: piecesReducer,
    vehicles: vehiclesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
