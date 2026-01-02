import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DataEntry, DataState } from "../types/types";
import { fetchJson } from "../api/api";

type FetchArgs = { key: string; url: string };

const initialState: DataState = {
  entries: {},
};

function ensureEntry(state: DataState, key: string): DataEntry {
  if (!state.entries[key]) {
    state.entries[key] = { status: "idle", error: null, data: null };
  }
  return state.entries[key];
}

export const fetchData = createAsyncThunk<
  { key: string; data: unknown },   
  FetchArgs,                        
  { rejectValue: { key: string; error: string } }
>(
  "data/fetchData",
  async ({ key, url }, { signal, rejectWithValue }) => {
    try {
      const data = await fetchJson<unknown>(url, signal);
      return { key, data };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      return rejectWithValue({ key, error: msg });
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearEntry(state: DataState, action: PayloadAction<{ key: string }>) {
      delete state.entries[action.payload.key];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        const key = action.meta.arg.key;
        const entry = ensureEntry(state, key);
        entry.status = "loading";
        entry.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const entry = ensureEntry(state, action.payload.key);
        entry.status = "succeeded";
        entry.error = null;
        entry.data = action.payload.data;
      })
      .addCase(fetchData.rejected, (state, action) => {
       
        const payload = action.payload;
        if (payload) {
          const entry = ensureEntry(state, payload.key);
          entry.status = "failed";
          entry.error = payload.error;
        } else {
          
          const key = action.meta.arg.key;
          const entry = ensureEntry(state, key);
          entry.status = "failed";
          entry.error = action.error.message ?? "Unknown error";
        }
      });
  },
});

export const { clearEntry } = dataSlice.actions;
export default dataSlice.reducer;
