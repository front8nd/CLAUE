import { createSlice } from "@reduxjs/toolkit";
const usersStorage = localStorage.getItem("User");
const parsedusersStorage = usersStorage ? JSON.parse(usersStorage) : [];

const initialState = {
  users: parsedusersStorage,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("User", state.users);
    },
  },
});

export const { userLoggedIn } = UserSlice.actions;
export default UserSlice.reducer;
