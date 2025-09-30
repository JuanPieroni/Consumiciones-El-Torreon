import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBarVanilla.css'

const NavBarVanilla = ({ onHistorialHover, onAdminHover }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img
                        src="/icons/picos22.svg"
                        alt="Logo"
                        className="navbar-logo"
                    />
                    <span className="navbar-title">El Torreon III</span>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-menu desktop-menu">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link 
                        to="/admin" 
                        className="navbar-link"
                        onMouseEnter={onAdminHover}
                    >
                        Admin
                    </Link>
                    <Link 
                        to="/historial" 
                        className="navbar-link"
                        onMouseEnter={onHistorialHover}
                    >
                        Historial
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link 
                        to="/" 
                        className="mobile-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/admin" 
                        className="mobile-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Admin
                    </Link>
                    <Link 
                        to="/historial" 
                        className="mobile-link"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Historial
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default NavBarVanilla