import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {ApiCategories, ApiCategory, Category} from "../type";

export const addNewCategory = createAsyncThunk<void, ApiCategory>(
  "budget/newCategory",
  async (category) => {
    await axiosApi.post("/categories.json", category);
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

export const editCategory = createAsyncThunk<void, Category>(
  "budget/editCategory",
  async (category) => {

    await axiosApi.put(`/categories/${category.id}.json`, {name: category.name, type: category.type});
  },
);