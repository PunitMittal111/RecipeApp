import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean | null;
  users?: User[];
  selectedUser?: User | null;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

// Login types
interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}
// update users
interface UpdateUserPayload {
  name?: string;
  email?: string;
}

interface UpdateUserResponse {
  user: User;
}

const apiUrl = import.meta.env.VITE_API_URL;
// Initial state
const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  isLoading: false,
  error: null,
  isAuthenticated: localStorage.getItem("isAuth") === "true" ? true : false,
  users: [],
  selectedUser: null,
};
// Async thunk: Register
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (body, { rejectWithValue }) => {
  try {
    const res = await axios.post<RegisterResponse>(
      `${apiUrl}/api/auth/register`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

// Async thunk: Login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post<LoginResponse>(
      `${apiUrl}/api/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    if (!error.response) {
      return rejectWithValue("Network error. Please try again.");
    }
    return rejectWithValue(error.response.data.message || "Login failed.");
  }
});

// Async thunk: Update User
export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  UpdateUserPayload,
  { rejectValue: string }
>("auth/updateUser", async (userData, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    const res = await axios.put<UpdateUserResponse>(
      `${apiUrl}/api/users/me`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Update failed.");
  }
});

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "auth/getUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      const res = await axios.get<{
        success: boolean;
        count: number;
        data: User[];
      }>(`${apiUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users."
      );
    }
  }
);

export const getUserById = createAsyncThunk<
  User,
  string, // user ID
  { rejectValue: string }
>("auth/getUserById", async (userId, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    const res = await axios.get<{ success: boolean; data: User }>(
      `${apiUrl}/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user."
    );
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          const { user } = action.payload;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoading = false;
          state.isAuthenticated = true; // optional: persist token
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("userId", user.id);
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to register user.";
      });

    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          const { user } = action.payload;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoading = false;
          state.isAuthenticated = true; // optional: persist token
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("userId", user.id);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to login.";
      });

    // users update
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UpdateUserResponse>) => {
          state.isLoading = false;
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update user.";
      });

    // Get all users
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        const userId = localStorage.getItem("userId");
        state.users = action.payload.filter((user) => user._id !== userId);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users.";
      });

    // Get single user by ID
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user.";
      });
  },
});

export default authSlice.reducer;
