import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Link to="/"><h1>Marvel</h1></Link>
            <Nav/>
        </header>
    )
}
