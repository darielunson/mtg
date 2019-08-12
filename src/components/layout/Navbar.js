import React from 'react';
import mtgLogo from './mtg_logo.png';
import Search from '../cards/Search';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-5">
            <a href="/"><img src={mtgLogo} alt="Magic: The Gathering" /></a>
            <span className="navbar-brand mb-0 h1 mx-auto">Creature Character Listings</span>
            <Search />
        </nav>
    )
}

export default Navbar;