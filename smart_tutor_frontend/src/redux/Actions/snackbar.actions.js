import { openSnackbar, closeSnackbar } from "../Slices/snackbarSlice";

export const openSnackbarAction = (msg, severity) => (dispatch) => {


    dispatch(openSnackbar({msg, severity}))
    //dispatch(login(email));
}

export const closeSnackbarAction = () => (dispatch) => {


    dispatch(closeSnackbar())
    //dispatch(login(email));
}