import React, { useEffect } from 'react'
import CharactersGrid from '../Characters/CharactersGrid';
import { useDispatch } from 'react-redux';
import { loadCharacters } from './../../actions';
import CharactersSearchForm from '../Characters/CharactersSearchForm';
import queryString from 'query-string';
import history from "../../routers/history";

export default function CharactersPage(props) {
    const dispatch = useDispatch();
    const {
        nameStartsWith = undefined,
        stories = [],
        comics = []
    } = queryString.parse(props.location.search, {
        arrayFormat: "comma"
    });

    useEffect(() => {
        dispatch(loadCharacters(nameStartsWith, comics, stories));
    });

    const handleSubmit = (values) => {
        const query = queryString.stringify(values, {
            arrayFormat: 'comma',
            skipEmptyString: true
        });
        history.push(`/characters${query !== '' ? `?${query}` : ''}`);
    };

    const handleClear = () => {
        history.push(`/characters`);
    };


    return (
        <div>
            <CharactersSearchForm handleSubmit={handleSubmit} handleClear={handleClear}/>
            <CharactersGrid params={{
                nameStartsWith,
                stories,
                comics
            }}/>
        </div>
    )
}
