import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {Category} from "../type";
import {fetchCategories, fetchCategoryEdit} from "./budgetThunks.ts";

interface BudgetSlice {
  modalTransaction: boolean,
  categories: Category[],
  editCategory: Category | null,
  lauding: boolean,
}

const initialState: BudgetSlice = {
  modalTransaction: false,
  categories: [],
  editCategory: null,
  lauding: false,
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

    resetEditCategory: (state) => {
      state.editCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.lauding = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}: PayloadAction<Category[] | []>) => {
      state.categories = categories;
      state.lauding = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.lauding = false;
    });


    builder.addCase(fetchCategoryEdit.fulfilled, (state, {payload: category}: PayloadAction<Category | null>) => {
      state.editCategory = category;
    });
  },
});

export const budgetReducer = budgetSlice.reducer;
export const {
  showModalTransaction,
  canselModalTransaction,
  resetEditCategory,
} = budgetSlice.actions;
export const selectModal = (state: RootState) => state.budget.modalTransaction;
export const selectCategories = (state: RootState) => state.budget.categories;
export const selectEditCategory = (state: RootState) => state.budget.editCategory;