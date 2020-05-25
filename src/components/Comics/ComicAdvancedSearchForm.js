import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    }
}));

export default function ComicAdvancedSearchForm({ open, handleSubmit, handleClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            titleStartsWith: '',
            format: '',
            issueNumber: undefined
        },
        validationSchema: Yup.object({
            titleStartsWith: Yup
                .string()
                .required('Title is a mandatory field'),
            format: Yup
                .string(),
            issueNumber: Yup.number(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            handleClose();
        },
    });
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog'
        >
            <DialogTitle id='responsive-dialog-title'>Advanced comic search form</DialogTitle>
            <DialogContent>
                <FormGroup className={classes.root}>
                    <TextField
                        name="titleStartsWith"
                        type="text"
                        label="Title"
                        onChange={formik.handleChange}
                        value={formik.values.titleStartsWith}
                        variant="outlined"
                        autoComplete="off"
                    />
                    {(formik.errors.titleStartsWith && formik.touched.titleStartsWith) && (
                        <Alert variant="filled" severity="error">{formik.errors.titleStartsWith}</Alert>
                    )}
                    <FormControl>
                        <InputLabel id='comic-format-label'>Comic format</InputLabel>
                        <Select
                            labelId='comic-format-label'
                            id='comic-format-select'
                            value={formik.values.format}
                            onChange={(event) => {
                                formik.setFieldValue('format', event.target.value);
                            }}
                        >
                            <MenuItem value="">Select format</MenuItem>
                            <MenuItem value="comic">comic</MenuItem>
                            <MenuItem value="magazine">magazine</MenuItem>
                            <MenuItem value="trade paperback">trade paperback</MenuItem>
                            <MenuItem value="hardcover">hardcover</MenuItem>
                            <MenuItem value="digest">digest</MenuItem>
                            <MenuItem value="graphic novel">graphic novel</MenuItem>
                            <MenuItem value="digital comic">digital comic</MenuItem>
                            <MenuItem value="infinite comic">infinite comic</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="issueNumber"
                        type="number"
                        label="Issue number"
                        onChange={formik.handleChange}
                        value={formik.values.issueNumber}
                        variant="outlined"
                        autoComplete="off"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={formik.submitForm} color="primary" variant="contained">
                    Search
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
