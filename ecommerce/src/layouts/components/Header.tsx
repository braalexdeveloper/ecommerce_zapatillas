import { Link } from "react-router-dom"


export const Header=()=>{
    return(
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
            </div>
            <div className="icons">
                <i className="fas fa-search"></i>
                <i className="fas fa-user"></i>
                <Link to="/cart"><span className="badge">1</span><i className="fas fa-shopping-cart"></i></Link>
            </div>
        </nav>
    </header>
    
        </>
    )
}