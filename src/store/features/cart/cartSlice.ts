import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CartItem {
    quantity: number;
    pieceId: string;
}

export interface UpdatePayload {
    pieceId: string;
    quantity: number
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
        update: (state, action: PayloadAction<UpdatePayload>) => {
            const copy = [...state.value];
            for (let i = 0; i < copy.length; i++) {
                if(copy[i].pieceId === action.payload.pieceId) {
                    copy[i].quantity = action.payload.quantity;
                    break;
                }
            }
            state.value = copy;
        },
        remove: (state, action: PayloadAction<string>) => {
            const copy = [...state.value];
            for (let i = 0; i < copy.length; i++) {
                if(copy[i].pieceId === action.payload) {
                    copy.splice(i, 1);
                    break;
                }
            }
            state.value = copy;
        },
    },
});

export const selectCart = (state: RootState) => state.cart.value;

export const { add, update, remove } = cartSlice.actions;

export default cartSlice.reducer;
