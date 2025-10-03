import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../models";

const initialState: IUser = {
  name: "",
  surname: "",
  email: "",
  favorites: [],
  isAuthenticated: false,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<Omit<IUser, "isAuthenticated" | "isAuthChecked">>
    ) => {
      const { name, surname, email, favorites } = action.payload;
      state.name = name;
      state.surname = surname;
      state.email = email;
      state.favorites = favorites;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    },
    logoutUser: (state) => {
      Object.assign(state, initialState);
      state.isAuthChecked = true;
    },
    updateFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateFavorites, setAuthChecked } =
  userSlice.actions;
export default userSlice.reducer;
