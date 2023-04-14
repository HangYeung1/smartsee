import { db } from "../firebaseConfig";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

// Interfaces
interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  imageURL: string;
  esg: number;
  esgEnvironment: number;
  esgSocial: number;
  esgGovernance: number;
  controversy: number;
}

interface Industry {
  name: string;
  count: number;
}
interface CompaniesState {
  list: Company[];
  industries: Industry[];
  status: "idle" | "loading" | "success" | "failed";
}

// Initial state
const initialState: CompaniesState = {
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
    return data.docs.map((doc) => {
      const extracted = doc.data();
      return {
        id: doc.id,
        name: extracted.name,
        industry: extracted.industry,
        description: extracted.description,
        imageURL: extracted.imageURL,
        esg: extracted.esg,
        esgEnvironment: extracted.esgEnvironment,
        esgSocial: extracted.esgSocial,
        esgGovernance: extracted.esgGovernance,
        controversy: extracted.controversy,
      };
    });
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
      .addCase(fetchCompanies.pending, (state, action) => {
        // Log pending
        console.log("Companies: Fetching...");
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        // Log success
        console.log("Companies: Successful!");

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
        console.log("Companies: Failed.");
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
