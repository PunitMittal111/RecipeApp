import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  _id?: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  prepTime: number;
  image: string;
  calories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  ingredients: Ingredient[];
  instructions: string[];
  notes: string;
}

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null; // to store the fetched recipe by ID
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};
const apiUrl = import.meta.env.VITE_API_URL;
// POST - Create Recipe
export const createRecipe = createAsyncThunk(
  "recipes/create",
  async (newRecipe: Recipe, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/createrecipes`,
        newRecipe
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to create recipe");
    }
  }
);

export const getAllRecipes = createAsyncThunk(
  "recipes/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}/api/recipes`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch recipes");
    }
  }
);

export const getRecipeById = createAsyncThunk<
  Recipe,
  string,
  { rejectValue: string }
>("recipes/getRecipeById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/api/recipes/${id}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || "Failed to fetch recipe");
  }
});

// SLICE
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createRecipe.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.loading = false;
          state.recipes.push(action.payload);
        }
      )
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedRecipe = null;
      })
      .addCase(
        getRecipeById.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.loading = false;
          state.selectedRecipe = action.payload;
        }
      )
      .addCase(getRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedRecipe = null;
      });
  },
});

export default recipeSlice.reducer;
