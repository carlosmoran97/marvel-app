import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadComicCharacters } from '../../actions';
import { get } from 'lodash/object';
import { ListItem, ListItemText, ListItemAvatar, Typography, Avatar } from "@material-ui/core";
import history from "../../routers/history";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export default function ComicCharacters({id}) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const characterIds = get(pagination, `comicCharacters[${id}].ids`, []);
    const nextPageUrl = get(pagination, `comicCharacters[${id}].nextPageUrl`, null);
    const characters = useSelector(state => state.entities.characters);

    const itemsToRender = [];
    characterIds.forEach(id => {
        itemsToRender.push(characters[id]);
    });

    const renderRow = ({ style, index }) => {
        const item = itemsToRender[index];
        return (
            <ListItem button style={{
                ...style,
                backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.1)'
            }} key={`character-${index}`} onClick={() => {
                history.push(`/characters/${item.id}`);
            }}>
                <ListItemAvatar>
                    <Avatar src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={<Typography noWrap>
                        {`${item.name}`}
                    </Typography>}
                />
            </ListItem>
        );
    };

    const itemCount = nextPageUrl !== null ? itemsToRender.length + 1 : itemsToRender.length; 

    const handleLoadMore = () => {
        dispatch( loadComicCharacters(id, nextPageUrl !== null) );
    };

    return (
        <div>
            <h2>Characters</h2>
            <InfiniteLoader
                isItemLoaded={index => index < itemsToRender.length}
                itemCount={itemCount}
                loadMoreItems={handleLoadMore}
            >
                {({ onItemsRendered, ref }) =>(
                <FixedSizeList
                    height={50 * Math.min(10, itemsToRender.length)}
                    width="100%" itemSize={50}
                    itemCount={itemsToRender.length} style={{
                        borderRadius: "10px",
                        border: "1px solid rgba(0,0,0,0.1)"
                    }}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                >
                    {renderRow}
                </FixedSizeList>)
                }
            </InfiniteLoader>
        </div>
    );
}
