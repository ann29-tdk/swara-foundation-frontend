import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "/assets/images/donate.png";
import sfl from "/assets/images/sfl.jpg"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <Link className="site-logo" to="/"><img height={96} width={96} src={sfl}/></Link>
            <nav className={isMenuOpen ? "open" : ""}>
                <NavLink
                    to="/"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={handleMenuToggle}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={handleMenuToggle}
                >
                    About
                </NavLink>
                <NavLink
                    to="/our-work"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={handleMenuToggle}
                >
                    Contributions
                </NavLink>
                <NavLink
                    to="/media"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    onClick={handleMenuToggle}
                >
                    Highlights
                </NavLink>
                <Link to="/donate" className="login-link" onClick={handleMenuToggle}>
                    <img
                        src={imageUrl}
                        className="login-icon"
                        alt="Donate"
                    />
                </Link>
            </nav>
            <div className="menu-toggle" onClick={handleMenuToggle}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
        </header>
    );
}
