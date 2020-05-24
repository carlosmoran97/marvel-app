import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleStory } from '../../actions';
import { Link } from 'react-router-dom';

export default function FavoriteStories() {
    const ids = useSelector(state => state.favorites.stories);
    const stories = useSelector(state => state.entities.stories);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleStory(id) );
    };

    return (
        <div>
            {ids.map(id => {
                const story = stories[id];
                return (
                    <div key={`story-${id}`}>
                        <Link to={`/stories/${id}`}>{story.title}</Link>
                        <button onClick={()=>{toggleFavorite(id)}}>Remove</button>
                    </div>
                );
            })}
        </div>
    );
}
