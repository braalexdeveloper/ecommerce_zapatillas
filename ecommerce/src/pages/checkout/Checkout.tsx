import './checkout.css'

export const Checkout = () => {
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
                                        <input type="text" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Apellido*</label>
                                        <input type="text" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Dirección*</label>
                                    <input type="text" required />
                                </div>

                                <div className="form-group">
                                    <label>Departamento (opcional)</label>
                                    <input type="text" />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Ciudad*</label>
                                        <input type="text" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Región*</label>
                                        <select required>
                                            <option value="">Seleccionar...</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Código Postal*</label>
                                        <input type="text" required />
                                    </div>
                                    <div className="form-group">
                                        <label>País*</label>
                                        <select required>
                                            <option value="CL">Chile</option>
                                            <option value="MX">México</option>
                                            <option value="CO">Colombia</option>
                                            <option value="AR">Argentina</option>
                                            <option value="ES">España</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Teléfono*</label>
                                    <input type="tel" required />
                                </div>

                                <div className="form-group">
                                    <label>Correo electrónico*</label>
                                    <input type="email" required />
                                </div>

                                <h2 className="section-title">Método de Envío</h2>

                                <div className="shipping-methods">
                                    <label className="shipping-method">
                                        <input type="radio" name="shipping" checked />
                                        <div className="method-content">
                                            <div className="method-name">Envío Estándar</div>
                                            <div className="method-details">3-5 días hábiles</div>
                                        </div>
                                        <div className="method-price">$9.99</div>
                                    </label>

                                    <label className="shipping-method">
                                        <input type="radio" name="shipping" />
                                        <div className="method-content">
                                            <div className="method-name">Envío Express</div>
                                            <div className="method-details">1-2 días hábiles</div>
                                        </div>
                                        <div className="method-price">$19.99</div>
                                    </label>
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
                                    <button type="submit" className="submit-btn">Completar Pedido</button>
                                </div>
                            </form>
                        </div>


                        <div className="order-summary">
                            <h2 className="section-title">Tu Pedido</h2>

                            <div className="order-items">
                                <div className="order-item">
                                    <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28" alt="Zapatillas" />
                                    <div className="item-details">
                                        <h3>Nike Air Max 270</h3>
                                        <p>Talla: 38 · Color: Negro/Rojo</p>
                                        <div className="item-price">$149.99</div>
                                    </div>
                                    <div className="item-qty">x1</div>
                                </div>

                                <div className="order-item">
                                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Zapatillas" />
                                    <div className="item-details">
                                        <h3>Adidas Ultraboost</h3>
                                        <p>Talla: 40 · Color: Blanco/Negro</p>
                                        <div className="item-price">$159.99</div>
                                    </div>
                                    <div className="item-qty">x2</div>
                                </div>
                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>$469.97</span>
                                </div>
                                <div className="total-row">
                                    <span>Envío</span>
                                    <span>$9.99</span>
                                </div>
                                <div className="total-row discount">
                                    <span>Descuento</span>
                                    <span>-$30.00</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>$449.96</span>
                                </div>
                            </div>

                            <div className="coupon-section">
                                <input type="text" placeholder="Código de descuento" />
                                <button className="apply-btn">Aplicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}