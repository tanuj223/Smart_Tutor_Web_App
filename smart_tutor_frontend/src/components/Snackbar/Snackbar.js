import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Alert, Snackbar } from '@mui/material';
import { connect } from "react-redux";
import { closeSnackbar } from "../../redux/Slices/snackbarSlice";

const MySnackbar = (props) => {

    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.msg}
            </Alert>
        </Snackbar>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.snackbar.showSnackbar,
        msg: state.snackbar.msg,
        severity: state.snackbar.severity,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch(closeSnackbar()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MySnackbar);
