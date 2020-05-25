import React from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import { Search, FilterList } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
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
export default function CharactersSearchForm({ handleSubmit, handleClear }) {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                nameStartsWith: '',
                comics: [],
                stories: [],
            }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
            validationSchema={Yup.object({
                nameStartsWith: Yup.string().required()
            })}
        >
            {({ errors, touched, handleSubmit, values, handleChange, submitForm }) => (
                <div>
                <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                    
                    <InputBase
                        className={classes.input}
                        placeholder="Search by name"
                        inputProps={{ 'aria-label': 'search by name' }}
                        name="nameStartsWith"
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
                {(errors.nameStartsWith && touched.nameStartsWith) && <p>{errors.nameStartsWith}</p>}
                </div>
                )}
                
        </Formik>
    )
}
/*
<FieldArray
                    name="comics"
                    render={arrayHelpers => (
                        <div>
                            {values.comics && values.comics.length > 0
                                ? (values.comics.map((comic, index) => (
                                <div key={`comic-${index}`}>
                                    <Field name={`comics.${index}`} />
                                    <button type="button" onClick={() => arrayHelpers.remove(index)}>-</button>
                                    <button type="button" onClick={() => arrayHelpers.insert(index+1, '')}>+</button>
                                </div>
                                )))
                                : (
                                    <button type="button" onClick={
                                        () => arrayHelpers.push('')
                                    }>Add a comic</button>
                                )}
                        </div>
                    )}
                />
                <FieldArray
                    name="stories"
                    render={arrayHelpers => (
                        <div>
                            {values.stories && values.stories.length > 0
                                ? (values.stories.map((story, index) => (
                                <div key={`story-${index}`}>
                                    <Field name={`stories.${index}`} />
                                    <button type="button" onClick={() => arrayHelpers.remove(index)}>-</button>
                                    <button type="button" onClick={() => arrayHelpers.insert(index+1, '')}>+</button>
                                </div>
                                )))
                                : (
                                    <button type="button" onClick={
                                        () => arrayHelpers.push('')
                                    }>Add a story</button>
                                )}
                        </div>
                    )}
                />
                <button type="submit">Search</button>
                <button type="button" onClick={handleClear}>Clear</button> */