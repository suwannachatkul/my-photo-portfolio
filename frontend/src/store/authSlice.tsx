import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface authState {
  user: string | null;
  isAuthenticated: boolean;
  token: string | null;
  processState?: "success" | "failed" | "pending" | "init";
  responseMessage?: string;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  processState: "init",
} as authState;

interface argsLogin {
  username: string;
  password: string;
}

interface MyKnownError {
  errMsg: string;
}

export const fetchLogin = createAsyncThunk<
  Partial<authState>,
  argsLogin,
  { rejectValue: MyKnownError }
>("auth/login", async (loginData, { rejectWithValue }) => {
  const response = await axios
    .postForm(process.env.REACT_APP_LOGIN_URL!, {
      username: loginData.username,
      password: loginData.password,
    })
    .catch(function (error) {
      return error;
    });

  if (response.statusText === "OK") {
    return {
      user: loginData.username,
      token: response.data.token,
    };
  } else {
    if (response.response && response.response.status === 401) {
      return rejectWithValue({
        errMsg: "Invalid Username or Password.",
      });
    }

    return rejectWithValue({
      errMsg: "Error occured.",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log("fullfilled", action.payload);
        state.user = action.payload.user!;
        state.token = action.payload.token!;
        state.responseMessage = "Login success!";
        state.isAuthenticated = true;
        state.processState = "success";
      })
      .addCase(fetchLogin.pending, (state, action) => {
        state.processState = "pending";
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        if (action.payload) {
          state.responseMessage = action.payload.errMsg;
        }
        state.isAuthenticated = false;
        state.processState = "failed";
      });
  },
});

export const stateIsAuth = (state: RootState) => state.auth.isAuthenticated;
export const stateUser = (state: RootState) => state.auth.user;
export const stateToken = (state: RootState) => state.auth.token;
export const stateResponseMessage = (state: RootState) =>
  state.auth.responseMessage;
export const stateProcessState = (state: RootState) => state.auth.processState;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
