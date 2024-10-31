import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  age: number;
  isAdmin: boolean;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  age: 0,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.age = action.payload.age;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.age = 0;
      state.isAdmin = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
