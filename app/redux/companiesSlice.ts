import { db } from "../firebaseConfig";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

// Initial state
const initialState = {
  list: [],
  industries: [],
  status: "idle",
};

// Aysnc Thunks
// Fetch companies from firestore
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const companiesCollection = collection(db, "companies");
    const data = await getDocs(companiesCollection);
    return data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

// Companies slice
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    test(state, action) {
      console.log("test");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        // Log success
        console.log("Fetched companies successfully!");

        // Set companies
        state.list = action.payload;

        // Calculate industries
        action.payload.forEach((company: any) => {
          if (!Object.keys(state.industries).includes(company.industry)) {
            state.industries.push({ name: company.industry, count: 1 });
          } else {
            state.industries.forEach((industry: any) => {
              if (industry.name === company.industry) {
                industry.count++;
              }
            });
          }

          // Set status to match
          state.status = "success";
        });
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        // Log failure
        console.log("Failed to fetch companies!");
        state.status = "failed";
      });
  },
});

export const { test } = companiesSlice.actions;
export default companiesSlice.reducer;

// Selectors
export const selectCompanies = createSelector(
  (state) => state.companies.list,
  (list) => list
);

export const selectIndustries = createSelector(
  (state) => state.companies.industries,
  (industries) => industries
);
