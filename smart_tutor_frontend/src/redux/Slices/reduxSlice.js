import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  loginError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload
    },
    
  }
});

export const { login, loading } = userSlice.actions;
export default userSlice.reducer;
