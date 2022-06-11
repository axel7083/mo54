import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CartItem {
    quantity: number;
    pieceId: string;
}

export interface UpdatePayload {
    pieceId: string;
    value: number
}

export interface PiecesState {
  value: CartItem[];
}

const initialState: PiecesState = {
  value: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CartItem>) => {
            state.value = [...state.value, action.payload];
        },
        increment: (state, action: PayloadAction<number>) => {
            const copy = [...state.value];
            copy[action.payload].quantity++;
            state.value = copy;
        },
        decrement: (state, action: PayloadAction<number>) => {
            const copy = [...state.value];
            copy[action.payload].quantity--;
            state.value = copy;
        },
        update: (state, action: PayloadAction<UpdatePayload>) => {
            const copy = [...state.value];
            for (let i = 0; i < copy.length; i++) {
                if(copy[i].pieceId === action.payload.pieceId) {
                    copy[i].quantity = action.payload.value;
                    break;
                }
            }
            state.value = copy;
        },
    },
});

export const selectPieces = (state: RootState) => state.cart.value;

export const { add, increment, decrement, update } = cartSlice.actions;

export default cartSlice.reducer;
