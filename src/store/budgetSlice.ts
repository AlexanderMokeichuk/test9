import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {Category, FormTransaction, Transaction} from "../type";
import {fetchCategories, fetchCategoryEdit, fetchTransactionEdit, fetchTransactions} from "./budgetThunks.ts";

interface BudgetSlice {
  modalTransaction: boolean,
  categories: Category[],
  editCategory: Category | null,
  editTransaction: FormTransaction | null,
  transactions: Transaction[],
  lauding: boolean,
}

const initialState: BudgetSlice = {
  modalTransaction: false,
  categories: [],
  editCategory: null,
  editTransaction: null,
  transactions: [],
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
    resetEditTransaction: (state) => {
      state.editTransaction = null;
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

    builder.addCase(fetchTransactionEdit.fulfilled, (state, {payload: transaction}: PayloadAction<FormTransaction | null>) => {
      state.editTransaction = transaction;
    });

    builder.addCase(fetchTransactions.pending, (state) => {
      state.lauding = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, {payload: transactions}: PayloadAction<Transaction[] | []>) => {
      state.transactions = transactions;
      state.lauding = false;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.lauding = false;
    });
  },
});

export const budgetReducer = budgetSlice.reducer;
export const {
  showModalTransaction,
  canselModalTransaction,
  resetEditCategory,
  resetEditTransaction,
} = budgetSlice.actions;
export const selectModal = (state: RootState) => state.budget.modalTransaction;
export const selectCategories = (state: RootState) => state.budget.categories;
export const selectEditCategory = (state: RootState) => state.budget.editCategory;
export const selectEditTransaction = (state: RootState) => state.budget.editTransaction;

export const selectTransactions = (state: RootState) => state.budget.transactions;