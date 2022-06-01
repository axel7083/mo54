import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import Vehicle from "../../../models/Vehicle";

export const defaultVehicles = [
    new Vehicle("Twingo 4*4"),
    new Vehicle("Reneau 209"),
    new Vehicle("Super wago 2000"),
    new Vehicle("Super wago 2000"),
]


export interface VehiclesState {
  value: Vehicle[];
}

const initialState: VehiclesState = {
  value: defaultVehicles,
};

export const VehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Vehicle>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { add } = VehiclesSlice.actions;

export const selectVehicles = (state: RootState) => state.vehicles.value;


export default VehiclesSlice.reducer;
