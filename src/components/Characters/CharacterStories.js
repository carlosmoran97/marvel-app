import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCharacterStories } from '../../actions';
import { get } from 'lodash/object';

export default function CharacterStories({ id }) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const storyIds = get(pagination, `characterStories[${id}].ids`, []);
    const nextPageUrl = get(pagination, `characterStories[${id}].nextPageUrl`, null);
    const stories = useSelector(state => state.entities.stories);

    const handleLoadMore = () => {
        dispatch( loadCharacterStories(id, nextPageUrl !== null) );
    };

    return (
        <div className="character__stories">
            <h2>Stories</h2>
            {storyIds.map(id => {
                const story = stories[id];
            return <div key={`story-${story.id}`}>{<Link to={`/stories/${story.id}`}>{story.title}</Link>}</div>;
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    );
}
