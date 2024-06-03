import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const usersStorage = localStorage.getItem("User");
const parsedUsersStorage = usersStorage ? JSON.parse(usersStorage) : false;

const initialState = {
  users: parsedUsersStorage,
  usersList: [],
};

export const getAllUsers = createAsyncThunk("Users/getAllUsers", async () => {
  try {
    const usersCollection = collection(db, "Users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Users:", userList);
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("User", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        console.log("Fetching users pending...");
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
        console.log("Fetching users fulfilled:", state.usersList);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        console.error("Fetching users rejected:", action.error.message);
      });
  },
});

export const { userLoggedIn } = UserSlice.actions;
export default UserSlice.reducer;
