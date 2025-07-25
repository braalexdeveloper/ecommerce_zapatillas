import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { getCart, removeFromCart, saveCart, type ProductCart } from "../../features/cart/services/CartService";
import { Link } from "react-router-dom";




export const Cart = () => {

    const [carrito, setCarrito] = useState<ProductCart[]>(getCart());
    const [payData, setPayData] = useState({
        subtotal: 0,
        envio: 0,
        descuento: 0,
        total: 0,
    });


    console.log("carga", carrito)

    const deleteItem = (id: number) => {
        setCarrito(removeFromCart(id));
        console.log("delete", carrito)
    }

    const changeCount = (value: number, id: number) => {
        const found = carrito.find(el => Number(el.id) === id);
        if (found) {

            found.quantity = found.quantity ? found.quantity + value : 1;
            found.subtotal = found.quantity * found.price;
            let newCart: ProductCart[] = carrito.map((el: ProductCart) => {
                if (el.id === found.id) {
                    return found;
                }
                return el;
            });

            setCarrito(newCart);

            saveCart(newCart);

        }


    }


    useEffect(() => {
        console.log("useeffect", carrito)
        const subTotal = carrito.reduce((suma, el) => suma + Number(el.subtotal || 0), 0);

        setPayData({
            ...payData,
            subtotal: subTotal,
            total: subTotal + payData.envio - payData.descuento,
        })
    }, [carrito])
    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.cartTitle}>Tu Carrito de Compras</h1>

            <div className={styles.cartContent}>
                <div className={styles.cartItems}>
                    <table className={styles.cartTable}>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carrito.map((el: any) => (
                                    <tr>
                                        <td data-label="Producto">
                                            <div className={styles.productCell}>
                                                <div className={styles.productImageCart}>
                                                    <img
                                                        src={'http://localhost:5000' + el.images[0].url}
                                                        alt="Nike Air Max 270"
                                                    />
                                                </div>
                                                <div className={styles.productInfo}>
                                                    <h3>{el.name}</h3>
                                                    <p>Talla: 38 · Color: Negro/Rojo</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.price}>
                                            <span>${el.price}</span>
                                            <div className={styles.oldPrice}>$179.99</div>
                                        </td>
                                        <td>
                                            <div className={styles.quantityControl}>
                                                <button className={styles.quantityButton} onClick={() => changeCount(-1, el.id)}>-</button>
                                                <input
                                                    type="number"
                                                    className={styles.quantityInput}
                                                    value={el.quantity}

                                                />
                                                <button className={styles.quantityButton} onClick={() => changeCount(1, el.id)}>+</button>
                                            </div>
                                        </td>
                                        <td className={styles.price}>${el.subtotal}</td>
                                        <td>
                                            <i className={styles.removeItem} onClick={() => deleteItem(el.id)}>🗑️</i>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                    <a href="shop.html" className={styles.continueShopping}>
                        ← Continuar comprando
                    </a>
                </div>

                <div className={styles.cartSummary}>
                    <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>

                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Subtotal</span>
                        <span className={styles.summaryValue}>${payData.subtotal}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Envío</span>
                        <span className={styles.summaryValue}>${payData.envio}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Descuento</span>
                        <span className={styles.summaryValue}>-${payData.descuento}</span>
                    </div>

                    <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span className={styles.totalLabel}>Total</span>
                        <span className={styles.totalPrice}>${payData.total}</span>
                    </div>

                    <Link to={'/checkout'} className={styles.checkoutButton}>
                        💳 Proceder al pago
                    </Link>
                </div>
            </div>


            <div className={styles.emptyCart} style={{ display: "none" }}>
                <div className={styles.emptyCartIcon}>🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>Parece que no has añadido ningún producto a tu carrito todavía.</p>
                <a href="shop.html" className={styles.emptyCartButton}>
                    ← Ir a la tienda
                </a>
            </div>
        </div>
    );
};
