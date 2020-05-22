import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Nav() {
    return (
        <div>
            <NavLink activeClassName="is-active" to="/characters">Characters</NavLink>
            <NavLink activeClassName="is-active" to="/comics">Comics</NavLink>
            <NavLink activeClassName="is-active" to="/favorites">Favorites</NavLink>
        </div>
    );
}
