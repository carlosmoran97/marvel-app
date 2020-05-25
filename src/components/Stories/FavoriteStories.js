import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleStory } from '../../actions';
import { FixedSizeList } from "react-window";
import { List, ListItem, ListItemText, Typography, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import history from "../../routers/history";

export default function FavoriteStories() {
    const ids = useSelector(state => state.favorites.stories);
    const stories = useSelector(state => state.entities.stories);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleStory(id) );
    };
    const storiesToRender = [];
    ids.forEach(id => {
        storiesToRender.push(stories[id]);
    });

    const renderRow = ({index, style}) => {
        const story = storiesToRender[index];
        return (
            <ListItem button ContainerProps={{ style: style }} onClick={()=>{
                history.push(`/comics/${comic.id}`);
            }} divider>
                <ListItemAvatar>
                    <Avatar>{story.title[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={<Typography noWrap>{story.title}</Typography>}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>{
                        toggleFavorite(story.id);
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
                height={60 * Math.min(10, storiesToRender.length)}
                itemSize={50}
                itemCount={storiesToRender.length}
                outerElementType={List}
            >
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
