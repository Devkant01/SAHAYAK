import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authRole: null,
};

const AuthRoleSlice = createSlice({
  name: 'authRole',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.authRole = action.payload;
    },
    clearUserRole: (state) => {
      state.authRole = null;
    },
  },
});

export const { setUserRole, clearUserRole } = AuthRoleSlice.actions;
export default AuthRoleSlice.reducer;