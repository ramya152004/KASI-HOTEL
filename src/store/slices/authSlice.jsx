import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { load } from "../../utils/storage";
import { hashPassword } from "../../utils/crypto";
import seedUsers from "../../data/seedUsers";

// users = everybody who has an account (saved in the browser, the admin is always there)
// session = the person who is logged in now, or null for a guest
function loadUsers() {
  var saved = load("skypark_users", []);
  var users = Array.isArray(saved) ? saved : [];
  seedUsers.forEach((seed) => {
    if (!users.find((obj) => obj.email == seed.email)) {
      users.unshift(seed);
    }
  });
  return users;
}

// the session keeps only what the pages need, never the password hash
function makeSession(user) {
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// Hashing is async, so register and login are createAsyncThunk.
// rejectWithValue("text") is how we send an error message back to the page.
export var registerUser = createAsyncThunk(
  "auth/registerUser",
  async (form, { getState, rejectWithValue }) => {
    var email = form.email.trim().toLowerCase();
    var users = getState().Auth.users;
    if (users.find((obj) => obj.email == email)) {
      return rejectWithValue("This email is already registered. Please login.");
    }
    var hash = await hashPassword(email, form.password);
    return {
      userId: Date.now(),
      name: form.name.trim(),
      email: email,
      phone: form.phone.trim(),
      passwordHash: hash,
      role: "customer",
      addresses: [],
    };
  },
);

export var loginUser = createAsyncThunk(
  "auth/loginUser",
  async (form, { getState, rejectWithValue }) => {
    var email = form.email.trim().toLowerCase();
    var user = getState().Auth.users.find((obj) => obj.email == email);
    var hash = await hashPassword(email, form.password);
    if (!user || user.passwordHash != hash) {
      return rejectWithValue("Wrong email or password");
    }
    return user;
  },
);

var AuthSlice = createSlice({
  name: "auth",
  initialState: {
    users: loadUsers(),
    session: load("skypark_session", null),
  },
  reducers: {
    logoutuser: (state) => {
      state.session = null;
    },
  },
  // what to do when a thunk finishes OK (fulfilled)
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.session = makeSession(action.payload); // new users are logged in at once
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.session = makeSession(action.payload);
      });
  },
});

export const { logoutuser } = AuthSlice.actions;
export default AuthSlice.reducer;
