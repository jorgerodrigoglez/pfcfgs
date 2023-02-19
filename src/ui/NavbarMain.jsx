import { NavLink } from "react-router-dom";

export const NavbarMain = () => {
  return (
    <nav className="navbar">
        <ul>
            <li>
                <NavLink 
                    className="navbar__link"
                    to="/notes"
                >
                    Projects
                </NavLink>
            </li>
            <li>
                <NavLink 
                    className="navbar__link"
                    to="/calendar"
                >
                    Calendar
                </NavLink>
            </li>
            <li>
                <NavLink 
                    className="navbar__link"
                    to="/count"
                >
                    Count
                </NavLink>
            </li>
        </ul>
      
    </nav>
  );
};
