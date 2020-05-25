import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCharacter } from '../../actions';
import { FixedSizeList } from "react-window";
import { List, ListItem, ListItemText, Typography, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import history from "../../routers/history";

export default function FavoriteCharacters() {
    const ids = useSelector(state => state.favorites.characters);
    const characters = useSelector(state => state.entities.characters);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleCharacter(id) );
    };
    const charactersToRender = [];
    ids.forEach(id => {
        charactersToRender.push(characters[id]);
    });

    const renderRow = ({index, style}) => {
        const character = charactersToRender[index];
        return (
            <ListItem button ContainerProps={{ style: style }} onClick={()=>{
                history.push(`/characters/${character.id}`);
            }} divider>
                <ListItemAvatar>
                    <Avatar>{character.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={<Typography noWrap>{character.name}</Typography>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>{
                        toggleFavorite(character.id);
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
                height={60 * Math.min(10, charactersToRender.length)}
                itemSize={50}
                itemCount={charactersToRender.length}
                outerElementType={List}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
