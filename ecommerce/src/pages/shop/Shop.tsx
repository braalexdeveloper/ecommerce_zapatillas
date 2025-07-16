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

                    <aside className="filters-sidebar">
                        <div className="filter-section">
                            <h3>Categorías <i className="fas fa-chevron-down"></i></h3>
                            <div className="filter-content">
                                <ul className="filter-options">
                                    <li>
                                        <input type="checkbox" id="category-running" checked />
                                        <label htmlFor="category-running">Running <span className="count">(24)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="category-basket" />
                                        <label htmlFor="category-basket">Basket <span className="count">(18)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="category-lifestyle" />
                                        <label htmlFor="category-lifestyle">Lifestyle <span className="count">(32)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="category-skate" />
                                        <label htmlFor="category-skate">Skate <span className="count">(12)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="category-training" />
                                        <label htmlFor="category-training">Training <span className="count">(7)</span></label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Precio <i className="fas fa-chevron-down"></i></h3>
                            <div className="filter-content">
                                <div className="price-range">
                                    <div className="progress"></div>
                                    <div className="range-input">
                                        <input type="range" className="range-min" min="0" max="300" value="50" />
                                        <input type="range" className="range-max" min="0" max="300" value="250" />
                                    </div>
                                </div>
                                <div className="price-input">
                                    <div>
                                        <span>Min</span>
                                        <input type="number" className="input-min" value="50" />
                                    </div>
                                    <div>
                                        <span>Max</span>
                                        <input type="number" className="input-max" value="250" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Color <i className="fas fa-chevron-down"></i></h3>
                            <div className="filter-content">
                                <div className="color-options">
                                    <div className="color-option selected" style={{ backgroundColor: '#000000' }} title="Negro"></div>
                                    <div className="color-option" style={{ backgroundColor: '#ffffff', border: '1px solid #eee' }} title="Blanco"></div>
                                    <div className="color-option" style={{ backgroundColor: '#6a0dad' }} title="Púrpura"></div>
                                    <div className="color-option" style={{ backgroundColor: '#ff00ff' }} title="Fucsia"></div>
                                    <div className="color-option" style={{ backgroundColor: '#ff0000' }} title="Rojo"></div>
                                    <div className="color-option" style={{ backgroundColor: '#0000ff' }} title="Azul"></div>
                                    <div className="color-option" style={{ backgroundColor: '#808080' }} title="Gris"></div>
                                    <div className="color-option" style={{ backgroundColor: '#964B00' }} title="Marrón"></div>
                                </div>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Talla <i className="fas fa-chevron-down"></i></h3>
                            <div className="filter-content">
                                <div className="size-options">
                                    <select className="size-select" multiple>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38" selected>38</option>
                                        <option value="39" selected>39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Marca <i className="fas fa-chevron-down"></i></h3>
                            <div className="filter-content">
                                <ul className="filter-options">
                                    <li>
                                        <input type="checkbox" id="brand-nike" checked />
                                        <label htmlFor="brand-nike">Nike <span className="count">(28)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="brand-adidas" checked />
                                        <label htmlFor="brand-adidas">Adidas <span className="count">(22)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="brand-puma" />
                                        <label htmlFor="brand-puma">Puma <span className="count">(15)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="brand-newbalance" />
                                        <label htmlFor="brand-newbalance">New Balance <span className="count">(9)</span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="brand-vans" />
                                        <label htmlFor="brand-vans">Vans <span className="count">(12)</span></label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button className="filter-button">Aplicar Filtros</button>
                    </aside>


                    <main className="products-section">
                        <div className="shop-topbar">
                            <div className="results-count">Mostrando 12 de 93 productos</div>
                            <div className="sort-options">
                                <label htmlFor="sort">Ordenar por:</label>
                                <select id="sort">
                                    <option value="popular">Más populares</option>
                                    <option value="newest">Más recientes</option>
                                    <option value="price-low">Precio: menor a mayor</option>
                                    <option value="price-high">Precio: mayor a menor</option>
                                    <option value="rating">Mejor valorados</option>
                                </select>
                            </div>
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