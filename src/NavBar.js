import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar({ theme, toggleTheme }) {
    const location = useLocation();

    return (
            <nav className="navbar-container navbar navbar-expand-lg">
                    <Link className="navbar-brand" to="/">LiveScoreBoard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navMain">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.hash === '/userCustomScoreBoard' ? 'active' : ''}`} to="/userCustomScoreBoard">Featured</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.hash === '/MatcheInfo' ? 'active' : ''}`} to="/MatcheInfo">Popular</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.hash === '#latest' ? 'active' : ''}`} to="#latest">Latest</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.hash === '#contact' ? 'active' : ''}`} to="#contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    className="theme-toggle"
                                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                >
                                    {theme === 'dark' ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79L6.76 4.84zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-3.03l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17.24 4.84l1.79-1.79 1.79 1.79-1.79 1.79-1.79-1.79zM20 13v-2h3v2h-3zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/></svg>
                                    )}
                                </button>
                            </li>
                        </ul>
                </div>
            </nav>
    )
}
export default NavBar;