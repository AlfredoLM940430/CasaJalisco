import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export const NavBar = () => {
    return (
        <div className="menu">
            <div className="container-menu">
                <nav className="mobil">
                    <NavLink className="btn btn-menu" to="/boletos"><i className="fa-solid fa-ticket fa-2xl"></i></NavLink>
                </nav>
                <div>
                    <NavLink to="/">
                    <picture>
                        <source srcSet="/img/lotto-image.avif" type="image/avif"/>
                        <source srcSet="/img/lotto-image.webp" type="image/webp"/>
                        <img src="/img/lotto-image.png" alt="Imagen React" className="lotto-img"/>
                    </picture>
                        {/* <img className="lotto-img" src="img/loto-image.png" alt=""/> */}
                    </NavLink>
                </div>
                
                <nav className="desk">

                    <HashLink className="btn btn-menu" to="/#">Inicio</HashLink>
                    <HashLink className="btn btn-menu" to="/#Nosotros">Nosotros</HashLink>
                    <HashLink className="btn btn-menu" to="/#Contacto">Contacto</HashLink>
                    <NavLink className="btn btn-menu" to="/boletos">Comprar Boletos</NavLink>
                    
                    <button className="nav-item dropdown p-0 btn btn-menu">
                        <div className="nav-link dropdown-toggle p-2" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa-solid fa-question fa-l"></i>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <HashLink className="dropdown-item text-center" to="/#Preguntas">Preguntas Frecuentes</HashLink>
                            <hr className="m-0 p-0" />
                            <NavLink className="dropdown-item text-center" to="/info">Información de Pago</NavLink>
                            <hr className="m-0 p-0" />
                            <NavLink className="dropdown-item text-center" to="/mi-boleto">
                                <i className="fa-solid fa-clover"></i> Ver Boleto <i className="fa-solid fa-clover"></i>
                            </NavLink>
                        </div>
                    </button>
                </nav>

                <nav className="mobil">
                    <button className="nav-item dropdown p-0 btn btn-menu">
                        <div className="nav-link dropdown-toggle p-2" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa-solid fa-question fa-xl"></i>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                            <HashLink className="dropdown-item text-center" to="/#Preguntas">Preguntas Frecuentes</HashLink>
                            <hr className="m-0 p-0" />
                            <HashLink className="dropdown-item text-center" to="/#Nosotros">Nosotros</HashLink>
                            <hr className="m-0 p-0" />
                            <HashLink className="dropdown-item text-center" to="/#Contacto">Contacto</HashLink>
                            <hr className="m-0 p-0" />
                            <NavLink className="dropdown-item text-center" to="/info">Información de Pago</NavLink>
                            <hr className="m-0 p-0" />
                            <NavLink className="dropdown-item text-center" to="/mi-boleto">
                                <i className="fa-solid fa-clover"></i> Ver Boleto <i className="fa-solid fa-clover"></i>
                            </NavLink>
                        </div>
                    </button>
                </nav>

            </div>
        </div>
)}