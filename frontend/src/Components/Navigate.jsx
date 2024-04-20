import React from 'react';
import { Link } from 'react-router-dom';

const Navigate = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Chatting App</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* "ms-auto" to align navbar items to right */}
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/chat" className="nav-link">Chat</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigate;
