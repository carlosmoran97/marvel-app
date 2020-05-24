import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCharacter } from '../../actions';
import { Card, CardHeader, CardActionArea, CardMedia, Avatar, IconButton, Grid } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import history from "../../routers/history";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
        height: 0,
        paddingTop: "100%;" // 4:3
    },
    avatar: {
        backgroundColor: red[500]
    },
}));

export default function CharacterGridItem({ character }) {
    const classes = useStyles();
    const isFavorite = useSelector(state => state.favorites.characters.includes(character.id));
    const dispatch = useDispatch();
    const toggleFavorite = () => {
        dispatch(toggleCharacter(character.id));
    };
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="character name first letter" className={classes.avatar}>
                            {character.name[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={toggleFavorite}>
                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    }
                    title={character.name}
                />
                <CardActionArea onClick={()=>{
                    history.push(`/characters/${character.id}`);
                }}>
                <CardMedia
                    className={classes.media}
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    title={character.name}
                />
                </CardActionArea>
            </Card>
        </Grid>
    );
}
/**
 *<Link to={`/characters/${character.id}`}>
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} image`}
                    height={300}
                />
            </Link>
 */