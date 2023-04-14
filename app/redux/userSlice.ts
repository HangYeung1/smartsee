import { auth, db } from "../firebaseConfig";
import { AppDispatch, RootState } from "./store";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// User interface
interface UserState {
  collections: {
    justUpdated: string[];
    recentlyViewed: string[];
    bookmarks: string[];
    _order: string[];
  };
  status: "idle" | "loading" | "success" | "failed";
}

// Initial state
const initialState: UserState = {
  collections: {
    justUpdated: [],
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
    const response = await getDoc(userDoc);
    return response.data().collections;
  }
);

// Post user bookmarks to firestore
export const postBookmarks = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/postBookmarks", async (bookmark: string, thunkAPI) => {
  thunkAPI.dispatch(updateBookmarks(bookmark));
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, {
    "collections.bookmarks": thunkAPI.getState().user.collections.bookmarks,
  });
});

// Post user recents to firestore
export const postRecents = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/postRecents", async (recent: string, thunkAPI) => {
  thunkAPI.dispatch(updateRecents(recent));
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, {
    "collections.recentlyViewed":
      thunkAPI.getState().user.collections.recentlyViewed,
  });
});

// Post user order to firestore
export const postOrder = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/postOrder", async (order: string, thunkAPI) => {
  thunkAPI.dispatch(setOrder(order));
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, {
    "collections._order": thunkAPI.getState().user.collections._order,
  });
});

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
      if (state.collections.recentlyViewed.includes(action.payload)) {
        state.collections.recentlyViewed =
          state.collections.recentlyViewed.filter(
            (recent) => recent !== action.payload
          );
      }
      state.collections.recentlyViewed.unshift(action.payload);
      if (state.collections.recentlyViewed.length > 15) {
        state.collections.recentlyViewed.pop();
      }
    },
    // Update bookmark
    updateBookmarks(state, action) {
      if (!state.collections.bookmarks.includes(action.payload)) {
        state.collections.bookmarks.unshift(action.payload);
      } else {
        state.collections.bookmarks = state.collections.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        );
      }
    },
    // Set order
    setOrder(state, action) {
      state.collections._order = action.payload;
    },
    // Set just updated
    setJustUpdated(state, action) {
      state.collections.justUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Collections
      .addCase(fetchCollections.pending, (state, action) => {
        // Log pending
        console.log("Collections: Fetching...");
        state.status = "loading";
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        // Log success and state to match
        console.log("Collections: Successful!");
        state.collections.bookmarks = action.payload.bookmarks;
        state.collections.recentlyViewed = action.payload.recentlyViewed;
        state.status = "success";
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        // Log failure
        console.log("Collections: Failed.");
        state.status = "failed";
      })

      // Recents
      .addCase(postRecents.pending, (state, action) => {
        // Log pending
        console.log("Recents: Updating...");
      })
      .addCase(postRecents.fulfilled, (state, action) => {
        // Log success
        console.log("Recents: Successful!");
      })
      .addCase(postRecents.rejected, (state, action) => {
        // Log failure
        console.log("Recents: Failed.");
      })

      // Bookmarks
      .addCase(postBookmarks.pending, (state, action) => {
        // Log pending
        console.log("Bookmarks: Updating...");
      })
      .addCase(postBookmarks.fulfilled, (state, action) => {
        // Log success
        console.log("Bookmarks: Successful!");
      })
      .addCase(postBookmarks.rejected, (state, action) => {
        // Log failure
        console.log("Bookmarks: Failed.");
      })

      // Order
      .addCase(postOrder.pending, (state, action) => {
        // Log pending
        console.log("Order: Updating...");
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        // Log success
        console.log("Order: Successful!");
      })
      .addCase(postOrder.rejected, (state, action) => {
        // Log failure
        console.log("Order: Failed.");
      });
  },
});

export const { resetUser, updateRecents, updateBookmarks, setOrder } =
  userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectCollections = createSelector(
  (state) => state.user.collections,
  (collections) => collections
);

export const selectBookmarks = createSelector(
  (state) => state.user.collections.bookmarks,
  (bookmarks) => bookmarks
);
