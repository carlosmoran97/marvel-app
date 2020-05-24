import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComic } from '../../actions';
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
        paddingTop: "150%;" // 4:3
    },
    avatar: {
        backgroundColor: red[500]
    },
}));


export default function ComicGridItem({ comic }) {
    const classes = useStyles();
    const isFavorite = useSelector(state => state.favorites.comics.includes(comic.id));
    const dispatch = useDispatch();
    const toggleFavorite = () => {
        dispatch(toggleComic(comic.id));
    };
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="character name first letter" className={classes.avatar}>
                            {comic.title[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={toggleFavorite}>
                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    }
                    title={comic.title}
                />
                <CardActionArea onClick={()=>{
                    history.push(`/comics/${comic.id}`);
                }}>
                <CardMedia
                    className={classes.media}
                    image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    title={comic.name}
                />
                </CardActionArea>
            </Card>
        </Grid>
    );
}
