import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/reduxSlice';
import snackbarReducer from './Slices/snackbarSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer
  }
});
