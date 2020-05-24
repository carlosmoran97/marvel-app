import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadComics } from '../../actions';
import { Link } from 'react-router-dom';
import ComicGridItem from './ComicGridItem';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    buttonContainer: {
        margin: "0 auto",
        textAlign: "center",
        marginTop: "20px"
    },
}));

export default function ComicsGrid({ params }) {
    const classes = useStyles();
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    let paramsString = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipEmptyString: true
    });
    const comicsIds = get(pagination, `comicsSearch[${paramsString}].ids`, []);
    const nextPageUrl = get(pagination, `comicsSearch[${paramsString}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);
    const handleLoadMore = () => {
        dispatch(loadComics(params.titleStartsWith, params.format, params.issueNumber, nextPageUrl !== null));
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {comicsIds.map(id => {
                    const comic = comics[id];
                    return (
                        <ComicGridItem key={`comic-${id}`} comic={comic} />
                    );
                })}
            </Grid>
            <div className={classes.buttonContainer}>
                {nextPageUrl !== null && <Button
                    onClick={handleLoadMore}
                    variant="contained" color="secondary"
                >Load more</Button>}
            </div>
        </div>
    )
}
