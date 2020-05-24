import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStoryComics } from '../../actions';
import { get } from 'lodash/object';
import { ListItem, ListItemText, ListItemAvatar, Typography, Avatar } from "@material-ui/core";
import history from "../../routers/history";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export default function StoryComics({ id }) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const storyIds = get(pagination, `storyComics[${id}].ids`, []);
    const nextPageUrl = get(pagination, `storyComics[${id}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);

    const itemsToRender = [];
    storyIds.forEach(id => {
        itemsToRender.push(comics[id]);
    });

    const renderRow = ({ style, index }) => {
        const item = itemsToRender[index];
        return (
            <ListItem button style={{
                ...style,
                backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.1)'
            }} key={`comic-${index}`} onClick={() => {
                history.push(`/comics/${item.id}`);
            }}>
                <ListItemAvatar>
                    <Avatar src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
                </ListItemAvatar>
                <ListItemText
                    disableTypography
                    primary={<Typography noWrap>
                        {`${item.title}`}
                    </Typography>}
                />
            </ListItem>
        );
    };

    const handleLoadMore = () => {
        dispatch(loadStoryComics(id, nextPageUrl !== null));
    };

    const itemCount = nextPageUrl !== null ? itemsToRender.length + 1 : itemsToRender.length; 

    return (
        <div>
            <h2>Comics</h2>
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
