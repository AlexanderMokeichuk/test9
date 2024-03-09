import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";

interface BudgetSlice {
  modalIsActive: boolean,
}

const initialState: BudgetSlice = {
  modalIsActive: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: initialState,
  reducers: {
    showModal: (state) => {
      state.modalIsActive = true;
    },
    canselModal: (state) => {
      state.modalIsActive = false;
    },
  }
});

export const budgetReducer = budgetSlice.reducer;
export const {
  showModal,
  canselModal,
} = budgetSlice.actions;
export const selectModal = (state: RootState) => state.budget.modalIsActive;