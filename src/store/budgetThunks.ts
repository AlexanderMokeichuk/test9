import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {
  ApiCategories,
  ApiCategory,
  ApiTransaction,
  ApiTransactions,
  Category, EditApiTransaction,
  FormTransaction,
  Transaction
} from "../type";

export const addNewCategory = createAsyncThunk<void, ApiCategory>(
  "budget/newCategory",
  async (category) => {
    await axiosApi.post("/categories.json", category);
  },
);

export const addNewTransaction = createAsyncThunk<void, ApiTransaction>(
  "budget/newTransaction",
  async (transaction) => {
    await axiosApi.post("/transactions.json", transaction);
  },
);

export const deleteCategory = createAsyncThunk<void, string>(
  "budget/deleteCategory",
  async (id, thunkAPI) => {
    if (confirm("Are you sure?")) {
      await axiosApi.delete(`/categories/${id}.json`);
      await thunkAPI.dispatch(fetchCategories());
    }
  },
);

export const deleteTransaction = createAsyncThunk<void, string>(
  "budget/deleteTransaction",
  async (id, thunkAPI) => {
    if (confirm("Are you sure?")) {
      await axiosApi.delete(`/transactions/${id}.json`);
      await thunkAPI.dispatch(fetchTransactions());
    }
  },
);

export const fetchCategories = createAsyncThunk<Category[] | [], undefined>(
  "budget/fetchCategories",
  async () => {
    const {data: response} = await axiosApi.get<ApiCategories | null>("/categories.json");
    if (!response) {
      return [];
    }
    const categories: Category[] = Object.keys(response).map((id) => {
      return {
        ...response[id],
        id
      };
    });

    return categories;
  },
);

export const fetchTransactions = createAsyncThunk<Transaction[] | [], undefined>(
  "budget/fetchTransactions",
  async () => {
    const {data: response} = await axiosApi.get<ApiTransactions | null>("/transactions.json");
    const {data: categories} = await axiosApi.get<ApiCategories | null>("/categories.json");

    if (response && categories) {
      const transactions  = Object.keys(response).map((id) => {
        return {
          ...response[id],
          id
        };
      });

      const arrayTransaction: Transaction[] = [];
      const arrayId: string[] = [];

      transactions.forEach((item) => {
        const category = categories[item.category];
        if (category) {
          arrayTransaction.push({
            ...categories[item.category],
            amount: item.amount,
            createdAt: item.createdAt,
            id: item.id,
          });
        } else {
          arrayId.push(item.id);
        }
      });

      arrayId.map( async (id) => {
        await axiosApi.delete(`/transactions/${id}.json`);
      });


      return arrayTransaction;
    }

    return [];
  },
);

export const fetchCategoryEdit = createAsyncThunk<Category | null, string>(
  "budget/fetchCategory",
  async (id) => {
    const {data: response} = await axiosApi.get<ApiCategory | null>(`/categories/${id}.json`);

    if (!response) {
      return null;
    }

    return {
      ...response,
      id: id,
    };
  },
);

export const fetchTransactionEdit = createAsyncThunk<FormTransaction | null, string>(
  "budget/fetchTransaction",
  async (id) => {
    const {data: response} = await axiosApi.get<ApiTransaction | null>(`/transactions/${id}.json`);
    const {data: categories} = await axiosApi.get<ApiCategories | null>("/categories.json");

    if (response && categories) {
      return {
        type: categories[response.category].type,
        amount: response.amount,
        category: response.category,
        createdAt: response.createdAt,
        id
      };
    }

    return null;
  },
);

export const editCategory = createAsyncThunk<void, Category>(
  "budget/editCategory",
  async (category) => {

    await axiosApi.put(`/categories/${category.id}.json`, {name: category.name, type: category.type});
  },
);

export const editTransaction = createAsyncThunk<void, EditApiTransaction>(
  "budget/editTransaction",
  async (transaction) => {

    await axiosApi.put(`/transactions/${transaction.id}.json`, {
      category: transaction.category,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
    });
  },
);