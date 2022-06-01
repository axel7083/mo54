import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {Piece} from "../../../models/Piece";

export interface CounterState {
  value: Piece[];
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

interface Filters {
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    vehicle?: string | undefined;
}

const initialState: CounterState = {
  value: [
      new Piece("Bouton", getRandomInt(10), []),
      new Piece("Roue", getRandomInt(10), []),
      new Piece("Vitre", getRandomInt(10), []),
      new Piece("Boite de vitesse", getRandomInt(10), []),
      new Piece("Piston", getRandomInt(10), []),
      new Piece("Bougie", getRandomInt(10), []),
      new Piece("Valve", getRandomInt(10), []),
      new Piece("Pot d'échappement", getRandomInt(10), []),
      new Piece("Silencieux", getRandomInt(10), []),
      new Piece("Volant", getRandomInt(10), []),
  ],
};

export const piecesSlice = createSlice({
  name: 'pieces',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Piece>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { add } = piecesSlice.actions;

export const selectPieces = (state: RootState) => state.pieces.value;

export const selectPiecesFiltered = (state: RootState, filters: Filters) => {
    return state.pieces.value.filter((piece) => {
        if(filters.priceMin && piece.price < filters.priceMin)
            return false;

        if(filters.priceMax && piece.price > filters.priceMax)
            return false;

        return !(filters.vehicle && !piece.compatibilities.includes(filters.vehicle));
    })
};

export default piecesSlice.reducer;
