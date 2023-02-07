import { Link, Outlet, useLocation } from "react-router-dom";
import { isUserLoggedIn, logOut } from '../util/UserUtil';

const Header = () => {
    const location = useLocation();

    const isEditPage = () => {
        return location.pathname.startsWith('/edit');
    };
    
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <Link to="/" className="navbar-brand">AdPortal</Link>
                <ul className="navbar-nav mr-auto">
                    {!isEditPage() && 
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">Add offer</Link>
                    </li>}
                </ul>
                <ul className="navbar-nav mr-5">
                    {isUserLoggedIn() ? <>
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
