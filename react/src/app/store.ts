import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import organizationsReducer from '../features/organizations/organizationsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    user: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
