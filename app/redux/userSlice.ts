import { auth, db } from "../firebaseConfig";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Initial state
const initialState = {
  collections: {
    justAdded: [],
    recentlyViewed: [],
    bookmarks: [],
    _order: [],
  },
  status: "idle",
};

// Aysnc Thunks
// Fetch user collections from firestore
export const fetchCollections = createAsyncThunk(
  "user/fetchCollections",
  async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const response: any = await getDoc(userDoc);
    return response.data().collections;
  }
);

// Post user bookmarks to firestore
export const postBookmark = createAsyncThunk(
  "user/postBookmark",
  async (bookmark, thunkAPI) => {
    thunkAPI.dispatch(updateBookmarks(bookmark));
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const response = await updateDoc(userDoc, {
      "collections.bookmarks": bookmark,
    });
    return response;
  }
);

// Post user recents to firestore
export const postRecents = createAsyncThunk(
  "user/postRecents",
  async (recent, thunkAPI) => {
    thunkAPI.dispatch(updateRecents(recent));
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const response = await updateDoc(userDoc, {
      "collections.recentlyViewed": recent,
    });
    return response;
  }
);

// Post user order to firestore
export const postOrder = createAsyncThunk(
  "user/postOrder",
  async (order, thunkAPI) => {
    thunkAPI.dispatch(updateOrder(order));
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const response = await updateDoc(userDoc, {
      "collections._order": order,
    });
    return response;
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reset user state
    resetUser(state, action) {
      return initialState;
    },
    // Update recently viewed
    updateRecents(state, action) {
      state.collections.recentlyViewed.unshift(action.payload);
      if (state.collections.recentlyViewed.length > 15) {
        state.collections.recentlyViewed.pop();
      }
    },
    // Update bookmark
    updateBookmarks(state, action) {
      if (!state.collections.bookmarks.includes(action.payload)) {
        state.collections.bookmarks.push(action.payload);
      } else {
        state.collections.bookmarks = state.collections.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        );
      }
    },
    // Set order
    updateOrder(state, action) {
      state.collections._order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.fulfilled, (state, action) => {
        // Set collections and state to match
        console.log("Fetched collections successfully!");
        state.collections = action.payload;
        state.status = "success";
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        // Log failure
        console.log("Failed to fetch collections!");
        state.status = "failed";
      });
  },
});

export const { resetUser, updateRecents, updateBookmarks, updateOrder } =
  userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectCollections = createSelector(
  (state) => state.user.collections,
  (collections) => collections
);
