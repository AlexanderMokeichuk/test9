import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface BudgetSlice {
  modalTransaction: boolean,
}

const initialState: BudgetSlice = {
  modalTransaction: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: initialState,
  reducers: {
    showModalTransaction: (state) => {
      state.modalTransaction = true;
    },
    canselModalTransaction: (state) => {
      state.modalTransaction = false;
    },
  }
});

export const budgetReducer = budgetSlice.reducer;
export const {
  showModalTransaction,
  canselModalTransaction,
} = budgetSlice.actions;
export const selectModal = (state: RootState) => state.budget.modalTransaction;