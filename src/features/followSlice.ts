import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FollowState {
  followingIds: string[];
  loading: boolean;
  followLoading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followingIds: [],
  loading: false,
  followLoading: false,
  error: null,
};

// Fetch following users of current user
export const fetchFollowing = createAsyncThunk(
  "follow/fetchFollowing",
  async (userId: string) => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/api/users/${userId}/follow-data`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.data.following.map((user: any) => user._id);
  }
);

// Follow/unfollow toggle
export const toggleFollowUser = createAsyncThunk<
  string,
  { targetUserId: string; isFollowing: boolean }
>("follow/toggleFollowUser", async ({ targetUserId, isFollowing }) => {
  const token = localStorage.getItem("token");
  const url = isFollowing ? `/api/users/unfollow` : `/api/users/follow`;
  await axios.post(
    url,
    { userId: targetUserId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return targetUserId;
});

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Following
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.followingIds = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch following";
      })

      // Follow/Unfollow Toggle
      .addCase(toggleFollowUser.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        state.followLoading = false;
        const targetId = action.payload;
        if (state.followingIds.includes(targetId)) {
          state.followingIds = state.followingIds.filter(
            (id) => id !== targetId
          );
        } else {
          state.followingIds.push(targetId);
        }
      })
      .addCase(toggleFollowUser.rejected, (state, action) => {
        state.followLoading = false;
        state.error = action.error.message ?? "Failed to toggle follow state";
      });
  },
});

export default followSlice.reducer;
