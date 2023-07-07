import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "./store";

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
    .post(
      process.env.REACT_APP_AUTH_URL! + "login/",
      {
        username: loginData.username,
        password: loginData.password,
      },
      { withCredentials: true }
    )
    .catch(function (error) {
      return error;
    });
  if (response.status === 200 || response.statusText === "OK") {
    return {
      user: loginData.username,
      token: response.data.access,
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

export const refreshAccessToken = createAsyncThunk<
  Partial<authState>,
  void,
  { rejectValue: { errMsg: string } }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  // refresh token by server-side cookies no need any data
  const response = await axios
    .post(
      process.env.REACT_APP_AUTH_URL! + "refresh/",
      {},
      { withCredentials: true }
    )
    .catch(function (error) {
      return error;
    });

  if (response.status === 200 || response.statusText === "OK") {
    return {
      token: response.data.access,
    };
  } else {
    return rejectWithValue({
      errMsg: "Failed to refresh token. Token is expired or invalid",
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      axios.post(
        process.env.REACT_APP_AUTH_URL! + "logout/",
        {},
        { withCredentials: true }
      );
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
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
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token!;
        state.isAuthenticated = true;
        state.responseMessage = "Token refresh success!";
        state.processState = "success";
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.processState = "pending";
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.processState = "failed";
      });
  },
});

export const stateIsAuth = (state: RootState) => state.auth.isAuthenticated;
export const stateAuthUser = (state: RootState) => state.auth.user;
export const stateAuthToken = (state: RootState) => state.auth.token;
export const stateAuthResponseMsg = (state: RootState) =>
  state.auth.responseMessage;
export const stateAuthProcessState = (state: RootState) =>
  state.auth.processState;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
