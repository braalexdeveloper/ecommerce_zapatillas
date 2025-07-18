import styles from './DetailProduct.module.css';
import './Detail.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { useEffect } from 'react';
import { getProductById } from '../../features/products/store/productSlice';

export const DetailProduct = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading, error } = useSelector((state: RootState) => state.products);


    useEffect(() => {
        if (id) {
            dispatch(getProductById(Number(id)));
        }
    }, [])

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No se encontró el producto.</p>;

    return (
        <>
            <div className={styles.breadcrumb}>
                <a href="index.html">Inicio</a>
                <span>/</span>
                <a href="shop.html">Tienda</a>
                <span>/</span>
                <a href="#">Running</a>
                <span>/</span>
                <a href="#">Nike Air Max 270</a>
            </div>


            <div className="product-detail">

                <div className="product-gallery">
                    <div className="thumbnail-container">
                        {product.images.map(image => (
                            <div className="thumbnail active" key={image.id}>
                                <img src={`http://localhost:5000${image.url}`} alt="Nike Air Max 270 - Vista frontal" />
                            </div>
                        ))}


                    </div>
                    <div className="main-image-container">
                        <div className="main-image">
                            <img src={`http://localhost:5000${product.images[0].url}`} alt="Nike Air Max 270" />
                        </div>
                        <button className="zoom-button">
                            <i className="fas fa-search-plus"></i>
                        </button>
                    </div>
                </div>


                <div className="product-info">
                    <span className="product-brand">{product.brand}</span>
                    <h1 className="product-title">{product.name}</h1>
                    <span className="product-category">{product.categories[0].name}</span>

                    <div className="product-rating">
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <span className="rating-count">(128 reseñas)</span>
                    </div>

                    <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        <span className="old-price">$179.99</span>
                        <span className="discount">16% OFF</span>
                    </div>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <div className="size-selector">
                        <h3>Talla <a href="#" className="size-guide">Guía de tallas</a></h3>
                        <div className="size-options">
                            {product.sizes.map((s: any) => (
                                <div className="size-option unavailable" key={s.id}>{s.size}</div>
                            ))}

                            <div className="size-option selected">38</div>

                        </div>
                    </div>

                    <div className="quantity-selector">
                        <h3>Cantidad</h3>
                        <div className="quantity-control">
                            <button className="quantity-button minus">-</button>
                            <input type="number" className="quantity-input" value="1" min="1" max="10" />
                            <button className="quantity-button plus">+</button>
                        </div>
                        <p className="stock-info"><span className="in-stock">En stock</span> - Solo quedan 5 pares</p>
                    </div>

                    <div className="action-buttons">
                        <button className="add-to-cart">
                            <i className="fas fa-shopping-cart"></i> Añadir al carrito
                        </button>
                        <button className="wishlist-button">
                            <i className="far fa-heart"></i>
                        </button>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="meta-label">SKU:</span>
                            <span className="meta-value">NK270RCT-001</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Categorías:</span>
                            <span className="meta-value">
                                {
                                product.categories.map((c: any) => (
                                    <>
                                    <a href="#" key={c.id}>{c.name} </a> 
                                    </>
                                ))
                                }

                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Tags:</span>
                            <span className="meta-value">
                                <a href="#">Air Max</a>, <a href="#">React</a>, <a href="#">Running</a>
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Compartir:</span>
                            <span className="meta-value">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-pinterest"></i></a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <section className="related-products">
                <h2 className="section-title">Productos relacionados</h2>
                <div className="products-grid">

                    <div className="product-card">
                        <div className="product-image">
                            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Zapatillas deportivas" />
                        </div>
                        <div className="product-info">
                            <h3 className="product-title">Adidas Ultraboost</h3>
                            <div className="product-price">$159.99</div>
                            <button className="add-to-cart">Añadir al carrito</button>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}