import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {IVehicle} from "../../../models/Vehicle";

export interface VehiclesState {
    value: IVehicle[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

const initialState: VehiclesState = {
    value: [],
    status: 'idle',
    error: null
};

export const fetchVehicles = createAsyncThunk('vehicles', async () => {
    console.log("fetchVehicles");
    const response = await fetch('/vehicles.json')
    return await response.json()
})

export const VehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IVehicle>) => {
            state.value = [...state.value, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchVehicles.fulfilled, (state, action) => {
            console.log(action.payload);
            state.value = action.payload
        })
    },
});

export const { add } = VehiclesSlice.actions;

export const selectVehicles = (state: RootState) => state.vehicles.value;


export default VehiclesSlice.reducer;
