import { Link, Outlet, useLocation } from "react-router-dom";
import { isUserLoggedIn, logOut } from '../util/UserUtil';

const Header = () => {
    const location = useLocation();

    const hideLinks = () => {
        return location.pathname === '/add'
            || location.pathname.startsWith('/edit');
    };
    
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <Link to="/" className="navbar-brand">AdPortal</Link>
                <div className="mr-auto"></div>
                <ul className="navbar-nav mr-5">
                    {!hideLinks() && 
                    <li className="nav-item mr-4">
                        <Link to="/add" className="btn btn-success">Add offer</Link>
                    </li>}
                    {isUserLoggedIn() ? !hideLinks() && <>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={logOut}>Log out</Link>
                    </li></>
                    : <>
                    <li className="nav-item">
                        <Link to="/log-in" className="nav-link">Log in</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sign-up" className="nav-link">Sign up</Link>
                    </li></>}
                </ul>
            </nav>
            
            <Outlet />
        </>
    );
};

export default Header;
