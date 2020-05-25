import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComic } from '../../actions';
import { FixedSizeList } from "react-window";
import { List, ListItem, ListItemText, Typography, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import history from "../../routers/history";

export default function FavoriteComics() {
    const ids = useSelector(state => state.favorites.comics);
    const comics = useSelector(state => state.entities.comics);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleComic(id) );
    };
    const comicsToRender = [];
    ids.forEach(id => {
        comicsToRender.push(comics[id]);
    });

    const renderRow = ({index, style}) => {
        const comic = comicsToRender[index];
        return (
            <ListItem button ContainerProps={{ style: style }} onClick={()=>{
                history.push(`/comics/${comic.id}`);
            }} divider>
                <ListItemAvatar>
                    <Avatar>{comic.title[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={<Typography noWrap>{comic.title}</Typography>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>{
                        toggleFavorite(comic.id);
                    }}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };
    return (
        <div>
            <FixedSizeList
                height={60 * Math.min(10, comicsToRender.length)}
                itemSize={50}
                itemCount={comicsToRender.length}
                outerElementType={List}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
