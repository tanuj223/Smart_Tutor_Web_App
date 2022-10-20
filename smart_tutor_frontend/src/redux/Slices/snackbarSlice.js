import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSnackbar: false,
  msg: "This is a Snackbar!",
  severity: "success"
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.msg = action.payload.msg,
      state.severity = action.payload.severity
      state.showSnackbar = true

    },
    closeSnackbar: (state, action) => {
      state.showSnackbar = false
    }
  }
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
