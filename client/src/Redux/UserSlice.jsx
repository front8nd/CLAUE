import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const usersStorage = localStorage.getItem("User");
const parsedUsersStorage = usersStorage ? JSON.parse(usersStorage) : false;

const userDetailStorage = localStorage.getItem("UserDetails");
const parsedUserDetailStorage = userDetailStorage
  ? JSON.parse(userDetailStorage)
  : [];

const initialState = {
  users: parsedUsersStorage,
  userDetail: parsedUserDetailStorage,
  usersList: [],
  loading: false,
};

export const getAllUsers = createAsyncThunk("Users/getAllUsers", async () => {
  try {
    const usersCollection = collection(db, "Users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

export const fetchLoggedInUserDetails = createAsyncThunk(
  "User/fetchLoggedInUserDetails",
  async () => {
    try {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              resolve({ ...docSnap.data(), id: docRef.id });
            } else {
              reject("No such document!");
            }
          } else {
            reject("User not authenticated");
          }
        });
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("User", JSON.stringify(state.users));
    },
    LoggedInUserDetails: (state, action) => {
      state.userDetail = action.payload;
      localStorage.setItem("UserDetails", JSON.stringify(state.userDetail));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        console.error("Fetching users rejected:", action.error.message);
        state.loading = false;
      })
      .addCase(fetchLoggedInUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUserDetails.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        localStorage.setItem("UserDetails", JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(fetchLoggedInUserDetails.rejected, (state, action) => {
        console.error("Fetching user details rejected:", action.error.message);
        state.loading = false;
      });
  },
});

export const { userLoggedIn, LoggedInUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
