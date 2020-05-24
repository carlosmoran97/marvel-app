import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCharacterStories } from '../../actions';
import { get } from 'lodash/object';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import history from "../../routers/history";

export default function CharacterStories({ id }) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const storyIds = get(pagination, `characterStories[${id}].ids`, []);
    const nextPageUrl = get(pagination, `characterStories[${id}].nextPageUrl`, null);
    const stories = useSelector(state => state.entities.stories);
    const itemsToRender = [];
    storyIds.forEach(id => {
        itemsToRender.push( stories[id] );
    });

    const itemCount = nextPageUrl !== null ? itemsToRender.length + 1 : itemsToRender.length; 

    const renderRow = ({style, index}) => {
        const item = itemsToRender[index];
        return (<ListItem button style={{
            ...style,
            backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.1)'
        }} key={`story-${index}`} onClick={() => {
            history.push(`/stories/${item.id}`);
        }}>
            <ListItemText
                disableTypography
                primary={<Typography noWrap>
                    {`${item.title}`}
                </Typography>}
            />
        </ListItem>);
    };

    const handleLoadMore = () => {
        dispatch( loadCharacterStories(id, nextPageUrl !== null) );
    };

    return (
        <div className="character__stories">
            <h2>Stories</h2>
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
