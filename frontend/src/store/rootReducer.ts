import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/user.reducer';
import signupSlice from '../features/api/signupSlice';
import groupSlice from '../features/api/groupSlice';
import { userSlice } from '../features/api/userSlice';
import transactionSlice from '../features/api/transactionSlice';
import logoutSlice from '../features/api/logoutSlice';
import settleUpSlice from '../features/api/settleUpSlice';
const rootReducer = combineReducers({
  user: userReducer,
  [signupSlice.reducerPath]: signupSlice.reducer,
  [groupSlice.reducerPath]: groupSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [transactionSlice.reducerPath]: transactionSlice.reducer,
  [logoutSlice.reducerPath]: logoutSlice.reducer,
  [settleUpSlice.reducerPath]: settleUpSlice.reducer,
  // Add other reducers here as they are created
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
