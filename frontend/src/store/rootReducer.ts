import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';
import signupSlice from '../features/api/signupSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [signupSlice.reducerPath]: signupSlice.reducer,
  // Add other reducers here as they are created
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
