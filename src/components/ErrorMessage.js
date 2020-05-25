import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { resetErrorMessage } from "../actions";

export default function ErrorMessage() {
    const errorMessage = useSelector(state => state.errorMessage);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch( resetErrorMessage() );
    };
    return (
        <Snackbar open={errorMessage !== null} onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>;
}