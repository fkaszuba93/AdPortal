import { Link, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <Link to="/" className="navbar-brand">AdPortal</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">Add offer</Link>
                    </li>
                </ul>
            </nav>
            
            <Outlet />
        </>
    );
};

export default Header;
