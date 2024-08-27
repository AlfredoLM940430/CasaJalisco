import { NavLink } from "react-router-dom"
import { useAuthStore } from "../../../hooks/useAuthStore";
import { LogoutApp } from "./LogoutApp";

export const AdminNav = () => {

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="/admin">
                <picture>
                    <source srcSet="/img/lotto-image.avif" type="image/avif"/>
                    <source srcSet="/img/lotto-image.webp" type="image/webp"/>
                    <img src="/img/lotto-image.png" alt="Imagen React" className=""/>
                </picture>
            </a>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/admin"><i className="fa-solid fa-house"></i> Inicio</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/registro"><i className="fa-solid fa-users"></i> Registro</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/control"><i className="fa-solid fa-list"></i> Control</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="info"><i className="fa-solid fa-circle-info"></i> Info</NavLink>
                </li> */}
                <LogoutApp/>
            </ul>
        </nav>    
)}