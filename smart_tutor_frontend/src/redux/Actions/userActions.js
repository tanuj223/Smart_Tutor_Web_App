import { login, loading } from "../Slices/reduxSlice";
import axios from "axios";
import { get } from "lodash";
import { openSnackbar } from "../Slices/snackbarSlice";

export const loginAction = (email, password) => (dispatch) => {
    console.log(email)
    console.log(password)
    dispatch(loading(true))

    axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password
    }).then(response => {
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", response.data.user._id)
        dispatch(login(response.data.user))
        dispatch(openSnackbar({ msg: "Logged in Succesfully!", severity: "success" }))

        dispatch(loading(false))

    }).catch(err => {
        console.log(err.response)
        //dispatch(loginError())
        //dispatch(loginError(get(err,"","Something went wrong")))
        dispatch(openSnackbar({ msg: get(err, "response.data.error"), severity: "error" }))
        dispatch(loading(false))
    })

    //dispatch(login(email));
}

export const registerAction = (username, email, password) => (dispatch) => {
    dispatch(loading(true))

    axios.post("http://localhost:5000/auth", {
        username,
        email,
        password
    }).then(response => {
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", response.data.user._id)
        dispatch(login(response.data.user))
        dispatch(openSnackbar({ msg: "User Registered Succesfully!", severity: "success" }))

        dispatch(loading(false))

    }).catch(err => {
        console.log(err.response)
        //dispatch(loginError())
        //dispatch(loginError(get(err,"","Something went wrong")))
        dispatch(openSnackbar({ msg: get(err, "response.data.error"), severity: "error" }))
        dispatch(loading(false))
    })
    //dispatch(login(email));
}

export const logout = () => dispatch => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(login(null));
    dispatch(openSnackbar({ msg: "Logged Out Succesfully!", severity: "success" }))

}