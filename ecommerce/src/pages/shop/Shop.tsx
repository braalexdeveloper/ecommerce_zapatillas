import { Filters } from "../../features/products/components/Filters";
import { Order } from "../../features/products/components/Order";
import { Products } from "../../features/products/components/Products";

const Shop = () => {
    return (
        <>
            
                <section className="shop-header">
                    <h1>Nuestra Colección</h1>
                    <div className="breadcrumb">
                        <a href="index.html">Inicio</a>
                        <span>/</span>
                        <a href="shop.html">Tienda</a>
                    </div>
                </section>


                <div className="shop-container">

                    <Filters/>


                    <main className="products-section">
                        <div className="shop-topbar">
                            <div className="results-count">Mostrando 12 de 93 productos</div>
                            <Order/>
                        </div>

                        <Products/>


                        <div className="pagination">
                            <a href="#" className="prev-next"><i className="fas fa-chevron-left"></i> Anterior</a>
                            <a href="#">1</a>
                            <span className="current">2</span>
                            <a href="#">3</a>
                            <a href="#">4</a>
                            <a href="#">5</a>
                            <a href="#" className="prev-next">Siguiente <i className="fas fa-chevron-right"></i></a>
                        </div>
                    </main>
                </div>
            
        </>
    )
}

export default Shop;