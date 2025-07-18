import { Link } from "react-router-dom"
import type { Product } from "../types/Product"

interface Props {
    product: Product
}

export const ProductCard = ({ product }: Props) => {
    return (
        <>

            <div className="product-card cardPorduct">
                <div className="product-image">
                    <img src={'http://localhost:5000' + product.images[0].url} alt="Zapatillas deportivas" />
                    <span className="product-badge">Nuevo</span>
                </div>
                <div className="product-info">
                    <h1 className="product-title"><Link to={'/product/' + product.id} >{product.name}</Link></h1>
                    <p className="product-category">{product.brand.name}</p>
                    <p className="product-category">{product.categoryShoes[0].category.name}</p>
                    <div className="product-price">${product.price} <span className="old-price">$179.99</span></div>
                    <button className="add-to-cart">Añadir al carrito</button>
                </div>
            </div>
        </>
    )
}

