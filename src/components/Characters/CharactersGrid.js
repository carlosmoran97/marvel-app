import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadCharacters } from './../../actions';
import CharacterGridItem from './CharacterGridItem';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

export default function CharactersGrid({ params }) {
    const classes = useStyles();
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    let paramsString = queryString.stringify(params, {
        arrayFormat: 'comma'
    });
    const charactersIds = get(pagination, `charactersSearch[${paramsString}].ids`, []);
    const nextPageUrl = get(pagination, `charactersSearch[${paramsString}].nextPageUrl`, null);
    const characters = useSelector(state => state.entities.characters);

    const handleLoadMore = () => {
        dispatch(loadCharacters(params.nameStartsWith, params.comics, params.stories, nextPageUrl !== null));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {charactersIds.map(id => {
                    const character = characters[id];
                    return (
                        <CharacterGridItem key={id} character={character} />
                    );
                })}
                {nextPageUrl !== null && <button onClick={handleLoadMore}>Load more</button>}
            </Grid>
        </div>
    )
}
