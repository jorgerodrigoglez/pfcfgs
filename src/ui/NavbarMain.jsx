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
                    Notas
                </NavLink>
            </li>
            <li>
                <NavLink 
                    className="navbar__link"
                    to="/calendar"
                >
                    Calendario
                </NavLink>
            </li>
        </ul>
      
    </nav>
  );
};
