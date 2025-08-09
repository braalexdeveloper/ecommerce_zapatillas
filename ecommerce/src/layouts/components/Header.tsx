import { Link } from "react-router-dom"

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export const Header = () => {

    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("Header must be used within a UserProvider");
    }

    const { user, logout } = userContext;

    return (
        <>

            <header>
                <nav className="navbar">
                    <div className="logo">Urban<span>Kicks</span></div>
                    <div className="nav-links">

                        <Link to="/">Inicio</Link>
                        <Link to="/shop">Tienda</Link>
                        <a href="#">Hombres</a>
                        <a href="#">Mujeres</a>
                        <a href="#">Novedades</a>
                        <a href="#">Ofertas</a>
                        {user ? (
                            <>
                                <Link to="/mis-pedidos">Mis Pedidos</Link>
                                <button onClick={logout}>Cerrar sesión</button>
                            </>
                        ) : (
                            <Link to="/login">Iniciar sesión</Link>
                        )}
                    </div>
                    <div className="icons">
                        <i className="fas fa-search"></i>
                        <Link to="/login"><i className="fas fa-user"></i></Link>
                        <Link to="/cart"><span className="badge">1</span><i className="fas fa-shopping-cart"></i></Link>
                    </div>
                </nav>
            </header>

        </>
    )
}