import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {Piece} from "../../../models/Piece";
import {piecesList} from "../../../models/PiecesList";

export interface PiecesState {
  value: Piece[];
}

export interface Filters {
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    vehicle?: string | undefined;
    page: number;
    elementPerPage: number;
    search?: string | undefined;
    available?: boolean | undefined
}

const initialState: PiecesState = {
  value: piecesList,
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

        if(filters.available && piece.available === 0)
            return false;

        if(filters.priceMin && piece.price < filters.priceMin)
            return false;

        if(filters.priceMax && piece.price > filters.priceMax)
            return false;

        if(filters.search && !piece.name.includes(filters.search))
            return false;

        return !(filters.vehicle && !piece.compatibilities.includes(filters.vehicle));
    }).splice(filters.page*filters.elementPerPage, filters.elementPerPage);
};

export default piecesSlice.reducer;
