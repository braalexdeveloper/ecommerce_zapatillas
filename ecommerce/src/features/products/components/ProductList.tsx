
import type { RootState } from "../../../store"
import { ProductCard } from "./ProductCard"
import { useSelector } from "react-redux"


export const ProductList = () => {
    const { productList, error, loading } = useSelector((state: RootState) => state.products);

    if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  
    return (
        <>

            <section className="featured">
                <h2 className="section-title">Destacados</h2>
                <div className="products-grid">

                    {
                        productList?.items.map(p => (
                            <ProductCard product={p} />
                        ))
                    }


                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80" alt="Zapatillas urbanas" />
                            <span className="product-badge">20% OFF</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product-title">Urban Classic Black</h3>
                            <div className="product-price">$89.99 <span className="old-price">$112.99</span></div>
                            <button className="add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>


                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80" alt="Zapatillas lifestyle" />
                        </div>
                        <div className="product-info">
                            <h3 className="product-title">Lifestyle Fuchsia</h3>
                            <div className="product-price">$99.99</div>
                            <button className="add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>


                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="Zapatillas premium" />
                            <span className="product-badge">Limited</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product-title">Premium Purple Edition</h3>
                            <div className="product-price">$199.99</div>
                            <button className="add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="product-card">
                <div className="product-image">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Zapatillas deportivas" />
                    <span className="product-badge">Nuevo</span>
                </div>
                <div className="product-info">
                    <h3 className="product-title">Zapatillas Running Pro</h3>
                    <div className="product-price">$129.99 <span className="old-price">$159.99</span></div>
                    <button className="add-to-cart">Añadir al carrito</button>
                </div>
            </div>
        </>
    )
}