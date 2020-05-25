import React, { useState, useEffect, useRef } from 'react';
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
import useDebounce from '../../utils/use-debounce';
import axios from 'axios';

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
    // Terminos de busqueda y resultados para comic
    const [comicSearch, setComicSearch] = React.useState([]);
    const [comicSearchTerm, setComicSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(comicSearchTerm, 500);

   
    useEffect(()=>{
        if(debouncedSearchTerm){
            searchComics(debouncedSearchTerm).then(results => {
                setComicSearch(results);
            });
        }
    },[debouncedSearchTerm]);
    

    const formik = useFormik({
        initialValues: {
            nameStartsWith: '',
            comics: [],
            stories: '',
        },
        onSubmit: (values) => {
            
            const result = {
                ...values,
                comics: values.comics.map(comic => comic.id)
            };
            handleSubmit(result);
            handleClose();
        },
        validationSchema: Yup.object({
            nameStartsWith: Yup.string(),
            comics: Yup.array(),
            stories: Yup.number()
        })
    });
    const handleDeleteComic = (comic) => () => {
        // ID
        formik.setFieldValue('comics', formik.values.comics.filter(
            c => c.id !== comic.id
        ));
    };
    const handleDeleteStory = (story) => () => {
        // ID
        formik.setFieldValue('story', formik.values.stories.filter(
            s => s.id !== story.id
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
                            console.log(newValue);
                            if(newValue !== null){
                            const { length } = formik.values.comics.filter(
                                c => c.id === newValue.id
                            );
                            if (length === 0) {
                                formik.setFieldValue('comics', [...formik.values.comics, newValue]);
                            }
                            
                        }
                        }}
                        onInputChange={(event) => {
                            if (typeof event.target.value !== 'number') {
                                // Search
                                setComicSearchTerm(event.target.value)
                            }
                        }}
                    />
                    <Paper component="ul" className={classes.chipArray}>
                        {formik.values.comics.length === 0 && <p>No comics selected</p>}
                        {formik.values.comics.map(comic => {
                            return <li key={`comic-${comic.id}`}>
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
                    <TextField
                        name="stories"
                        type="number"
                        label="Story ID"
                        onChange={formik.handleChange}
                        value={formik.values.stories}
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
    )
}

const apikey = process.env.MARVEL_PUBLIC_KEY;
const baseUrl = process.env.MARVEL_API_URL;

function searchComics(search){
    return axios
        .get(`${baseUrl}comics?apikey=${apikey}&titleStartsWith=${search}&orderBy=issueNumber`)
        .then(r => r.data.data.results);
}

function searchStories(search){
    return axios
        .get(`${baseUrl}stories?apikey=${apikey}&titleStartsWith=${search}`)
        .then(r => r.data.data.results);
}