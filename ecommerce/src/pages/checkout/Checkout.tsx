import { useEffect, useState } from 'react';
import { getCart, type ProductCart } from '../../features/cart/services/CartService'
import './checkout.css'
import { type Order } from '../../features/checkout/types/Order';


import { createOrder } from '../../features/checkout/service/OrderService';

export const Checkout = () => {
    const [carrito, setCarrito] = useState<ProductCart[]>(getCart());

    const [order, setOrder] = useState<Order>({
        address: '',
        total: 0,
        name: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        order_shoes: carrito.map((el) => {
            return {
                shoe_id: Number(el.id),
                quantity: el.quantity ?? 0,
                subtotal: el.subtotal ?? 0
            }
        })
    });

    const handleOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value
        });
    }

  


    const payment = async () => {
        
console.log("este es el order: ",order)
            const createdOrder = await createOrder(order);
            console.log(createdOrder)
            if (createdOrder.url) {
                window.location.href = createdOrder.url.sandbox_url;

            }
        

    }

    useEffect(() => {
        let newTotal = carrito.reduce((sum, el) => sum + (Number(el.subtotal) ?? 0), 0);
        setOrder({
            ...order,
            total: newTotal
        })
        console.log(order)
        
    }, [carrito]);

    return (
        <>
            <div className="checkout-page">
                <div className="checkout-container">

                    <div className="checkout-steps">
                        <div className="step active">
                            <div className="step-number">1</div>
                            <div className="step-title">Envío</div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-title">Pago</div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-title">Confirmación</div>
                        </div>
                    </div>

                    <div className="checkout-grid">

                        <div className="checkout-form">
                            <h2 className="section-title">Información de Envío</h2>

                            <form>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nombre*</label>
                                        <input type="text" name='name' value={order?.name} onChange={handleOrder} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido*</label>
                                        <input type="text" name='lastName' value={order?.lastName} onChange={handleOrder} required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Dirección*</label>
                                    <input type="text" value={order?.address} name='address' onChange={handleOrder} required />
                                </div>


                                <div className="form-row">
                                    <div className="form-group">
                                        <label>DNI*</label>
                                        <input type="text" name='dni' value={order?.dni} onChange={handleOrder} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Teléfono*</label>
                                        <input type="tel" name='phone' value={order?.phone} onChange={handleOrder} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Correo electrónico*</label>
                                    <input type="email" name='email' value={order?.email} onChange={handleOrder} required />
                                </div>

                                <h2 className="section-title">Método de Pago</h2>

                                <div className="payment-methods">
                                    <div className="payment-tabs">
                                        <button type="button" className="payment-tab active">Tarjeta</button>
                                        <button type="button" className="payment-tab">PayPal</button>
                                        <button type="button" className="payment-tab">Transferencia</button>
                                    </div>

                                    <div className="payment-content active">
                                        <div className="form-group">
                                            <label>Número de tarjeta*</label>
                                            <input type="text" placeholder="1234 5678 9012 3456" required />
                                        </div>

                                        <div className="form-group">
                                            <label>Nombre en la tarjeta*</label>
                                            <input type="text" required />
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Expiración*</label>
                                                <input type="text" placeholder="MM/AA" required />
                                            </div>
                                            <div className="form-group">
                                                <label>CVV*</label>
                                                <input type="text" placeholder="123" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-footer">
                                    <a href="cart.html" className="back-link">← Volver al carrito</a>
                                    <button type="button" className="submit-btn" onClick={payment}>Completar Pedido</button>
                                </div>
                            </form>
                        </div>


                        <div className="order-summary">
                            <h2 className="section-title">Tu Pedido</h2>

                            <div className="order-items">
                                {carrito.map((el) => (
                                    <div className="order-item" key={el.id}>
                                        <img src={'http://localhost:5000' + el.images[0].url} alt="Zapatillas" />
                                        <div className="item-details">
                                            <h3>{el.name}</h3>
                                            <p>Talla: 38 · Color: Negro/Rojo</p>
                                            <div className="item-price">${el.price}</div>
                                        </div>
                                        <div className="item-qty">x{el.quantity}</div>
                                    </div>
                                ))}


                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>${order.total}</span>
                                </div>
                                <div className="total-row">
                                    <span>Envío</span>
                                    <span>$0</span>
                                </div>
                                <div className="total-row discount">
                                    <span>Descuento</span>
                                    <span>-$0.00</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>${order.total}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}