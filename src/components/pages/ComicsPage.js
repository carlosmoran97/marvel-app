import React, { useEffect } from 'react';
import ComicsGrid from '../Comics/ComicsGrid';
import ComicsSearchForm from '../Comics/ComicsSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { loadComics } from '../../actions';
import queryString from 'query-string';
import history from "../../routers/history";

export default function ComicsPage(props) {
    const dispatch = useDispatch();
    const {
        titleStartsWith = undefined,
        format = undefined,
        issueNumber = undefined,
    } = queryString.parse(props.location.search, {
        arrayFormat: "comma"
    });

    useEffect(() => {
        dispatch(loadComics(titleStartsWith, format, issueNumber));
    });

    const handleSubmit = (values) => {
        const query = queryString.stringify(values, {
            arrayFormat: 'comma',
            skipEmptyString: true
        });
        history.push(`/comics${query !== '' ? `?${query}` : ''}`);
    };

    const handleClear = () => {
        history.push(`/comics`);
    };

    return (
        <div>
            <ComicsSearchForm handleSubmit={handleSubmit} handleClear={handleClear} />
            {}
            <ComicsGrid params={{
                titleStartsWith,
                format,
                issueNumber
            }} />
        </div>
    );
}
