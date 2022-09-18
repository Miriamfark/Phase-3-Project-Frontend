import React from 'react';
import { NavLink } from 'react-router-dom'

function NavBar() {
    
    return (
        <nav className="nav-wrapper">
            {/* <NavLink className="logo btn" exact to="/">Home</NavLink> */}
            <NavLink className="navlink btn" exact to="/days">Days</NavLink>
            <NavLink className="navlink btn" exact to="/categories">Categories</NavLink>
            <NavLink className="navlink btn" exact to="/tasks">Tasks</NavLink>
        </nav>
    );
}

export default NavBar

