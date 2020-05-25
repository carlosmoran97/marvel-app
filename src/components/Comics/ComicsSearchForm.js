import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import { Search, FilterList } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import ComicAdvancedSearchForm from './ComicAdvancedSearchForm';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: "800px",
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
    const [open, setOpen] = useState(false);
    return (<div>
        <Formik
            initialValues={{
                titleStartsWith: ''
            }}
            validationSchema={Yup.object({
                titleStartsWith: Yup
                    .string()
                    .required('El titulo es requerido'),
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ errors, touched, values, submitForm, handleChange, handleSubmit }) => (
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
                        <IconButton className={classes.iconButton} aria-label="directions" onClick={()=>{
                            setOpen(true);
                        }}>
                            <FilterList />
                        </IconButton>
                    </Paper>
                    {(errors.titleStartsWith && touched.titleStartsWith) && <p>{errors.titleStartsWith}</p>}
                </div>
            )}
        </Formik>
        <ComicAdvancedSearchForm open={open} handleSubmit={handleSubmit} handleClose={()=>{
            setOpen(false);
        }}/>
    </div>
    );
}
