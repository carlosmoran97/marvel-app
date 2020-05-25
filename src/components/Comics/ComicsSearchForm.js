import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from'yup';
import { Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import { Search, FilterList } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: "400px",
        margin: "0 auto",
        marginBottom: theme.spacing(3),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function ComicsSearchForm({ handleSubmit, handleClear }) {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                titleStartsWith: '',
                format: '',
                issueNumber: undefined
            }}
            validationSchema={Yup.object({
                titleStartsWith: Yup
                    .string()
                    .required('El titulo es requerido'),
                format: Yup
                    .string(),
                issueNumber: Yup.number()
            })}
            onSubmit={(values)=> {
                handleSubmit(values);
            }}
        >
            {({errors, touched, values, submitForm, handleChange, handleSubmit})=>(
                <div>
                <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                    
                    <InputBase
                        className={classes.input}
                        placeholder="Search by name"
                        inputProps={{ 'aria-label': 'search by name' }}
                        name="titleStartsWith"
                        onChange={handleChange}
                    />
                    <IconButton className={classes.iconButton} aria-label="search" onClick={submitForm}>
                        <Search />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton className={classes.iconButton} aria-label="directions">
                        <FilterList />
                    </IconButton>
                </Paper>
                    {(errors.titleStartsWith && touched.titleStartsWith) && <p>{errors.titleStartsWith}</p>}
                    </div>
            )}
        </Formik>
    )
}
/**
 * <select
                        name="format"
                        value={values.format}
                        onChange={handleChange}
                    >
                        <option value="">Select a format</option>
                        <option value="comic">comic</option>
                        <option value="magazine">magazine</option>
                        <option value="trade paperback">trade paperback</option>
                        <option value="hardcover">hardcover</option>
                        <option value="digest">digest</option>
                        <option value="graphic novel">graphic novel</option>
                        <option value="digital comic">digital comic</option>
                        <option value="infinite comic">infinite comic</option>
                    </select>
                    <Field name="issueNumber" type="number" />
                    <button type="submit">Search</button>
                    <button type="button" onClick={handleClear}>Clear</button>
 */