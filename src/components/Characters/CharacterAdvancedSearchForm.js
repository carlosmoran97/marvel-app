import React, { useState } from 'react';
import { Alert, Autocomplete } from "@material-ui/lab";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormGroup,
    Chip,
    Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    chipArray: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function CharacterAdvancedSearchForm({ open, handleSubmit, handleClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const [comicSearch, setComicSearch] = React.useState([]);
    const [storySearch, setStorySearch] = React.useState([]);
    const formik = useFormik({
        initialValues: {
            nameStartsWith: '',
            comics: [],
            stories: [],
        },
        onSubmit: (values) => {
            //handleSubmit(values);
            console.log(values);
            handleClose();
        },
        validationSchema: Yup.object({
            nameStartsWith: Yup.string().required()
        })
    });
    const handleDeleteComic = (comic) => () => {
        // ID
        formik.setFieldValue('comics', formik.values.comics.filter(
            c => c.title !== comic.title
        ));
    };
    const handleDeleteStory = (story) => () => {
        // ID
        formik.setFieldValue('story', formik.values.stories.filter(
            s => s.title !== story.title
        ));
    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog'
        >
            <DialogTitle id='responsive-dialog-title'>Advanced character search form</DialogTitle>
            <DialogContent>
                <FormGroup className={classes.root}>
                    <TextField
                        name="nameStartsWith"
                        type="text"
                        label="Name"
                        onChange={formik.handleChange}
                        value={formik.values.nameStartsWith}
                        variant="outlined"
                        autoComplete="off"
                    />
                    {(formik.errors.titleStartsWith && formik.touched.titleStartsWith) && (
                        <Alert variant="filled" severity="error">{formik.errors.titleStartsWith}</Alert>
                    )}
                    <Autocomplete
                        id="comic-box"
                        options={comicSearch}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Comic" variant="outlined" />}
                        onChange={(event, newValue) => {
                            const { length } = formik.values.comics.filter(
                                c => c.title !== comic.title
                            );
                            if (newValue !== null) {
                                if (length === 0) {
                                    formik.setFieldValue('comics', [...formik.values.comics, newValue]);
                                }
                            }
                        }}
                        onInputChange={(event) => {
                            if (typeof event.target.value !== 'number') {
                                // Search
                                console.log(event.target.value);
                            }
                        }}
                    />
                    <Paper component="ul" className={classes.chipArray}>
                        {formik.values.comics.length === 0 && <p>No comics selected</p>}
                        {formik.values.comics.map(comic => {
                            //return <li key={`comic-${comic.id}`}>
                            return <li key={`comic-${Math.random()}`}>
                                <Chip
                                    label={comic.title}
                                    className={classes.chip}
                                    onDelete={handleDeleteComic(comic)}
                                />
                            </li>;
                        })}
                    </Paper>
                    {(formik.errors.titleStartsWith && formik.touched.titleStartsWith) && (
                        <Alert variant="filled" severity="error">{formik.errors.titleStartsWith}</Alert>
                    )}
                    <Autocomplete
                        id="story-box"
                        options={storySearch}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Story" variant="outlined" />}
                        onChange={(event, newValue) => {
                            const { length } = formik.values.stories.filter(
                                s => s.title !== story.title
                            );
                            if (newValue !== null) {
                                if (length === 0) {
                                    formik.setFieldValue('stories', [...formik.values.stories, newValue]);
                                }
                            }
                        }}
                        onInputChange={(event) => {
                            if (typeof event.target.value !== 'number') {
                                // Search
                                console.log(event.target.value);
                            }
                        }}
                    />
                    <Paper component="ul" className={classes.chipArray}>
                        {formik.values.stories.length === 0 && <p>No stories selected</p>}
                        {formik.values.stories.map(story => {
                            //return <li key={`comic-${comic.id}`}>
                            return <li key={`story-${Math.random()}`}>
                                <Chip
                                    label={story.title}
                                    className={classes.chip}
                                    onDelete={handleDeleteStory(story)}
                                />
                            </li>;
                        })}
                    </Paper>
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
    )
}
