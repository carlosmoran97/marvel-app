import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadComics } from '../../actions';
import { Link } from 'react-router-dom';
import ComicGridItem from './ComicGridItem';

export default function ComicsGrid({params}) {
    const pagination = useSelector(state=>state.pagination);
    const dispatch = useDispatch();
    let paramsString = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipEmptyString: true
    });
    const comicsIds = get(pagination, `comicsSearch[${paramsString}].ids`, []);
    const nextPageUrl = get(pagination, `comicsSearch[${paramsString}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);
    const handleLoadMore = () => {
        dispatch( loadComics(params.titleStartsWith, params.format, params.issueNumber, nextPageUrl !== null ) );
    };
    return (
        <div>
            {comicsIds.map(id => {
                const comic = comics[id];
                return (
                    <ComicGridItem key={`comic-${id}`} comic={comic}/>
                );
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
