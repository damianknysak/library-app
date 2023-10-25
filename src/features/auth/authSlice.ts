import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null | User; // Zdefiniuj typ User lub użyj innego odpowiedniego typu
  token: null | string; // Możesz użyć innego typu, jeśli token jest bardziej złożony
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

const userStorage = localStorage.getItem("user");
const tokenStorage = localStorage.getItem("accessToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userStorage ? JSON.parse(userStorage) : null,
    token: tokenStorage ? tokenStorage : null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;

export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
