import { useNavigate } from 'react-router-dom';
import './order.css'
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '../../store';
import { ordersByClient } from './store/OrderSlice';

import { UserContext } from '../../context/UserContext';


export const Orders = () => {

    const userContext=useContext(UserContext);
    if (!userContext) {
  throw new Error("Logout must be used within a UserProvider");
}
    const { logout,user }=userContext;

    const dispath = useDispatch<AppDispatch>();
        const { orders, loading, error } = useSelector((state: RootState) => state.orders);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include", // esto es importante para enviar cookies
        });

        let data = await response.json()
        console.log(data)
        logout();
        navigate("/login");
    }

    useEffect(() => {
        
        if(user){
dispath(ordersByClient(user.client_id));
        console.log(orders)
        }
        
    }, [])

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Mis Pedidos</h1>
                    <h2>Bienvenido {user?.name}</h2>
                    <div className="order-filter">
                        <select>
                            <option value="all">Todos los pedidos</option>
                            <option value="last30">Últimos 30 días</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <button onClick={handleLogout}>Cessar sesión</button>
                </div>

                <div className="orders-list">


                    {orders.map((el: any) => (
                        <div className="order-card" key={el.id}>
                            <div className="order-header">
                                <div className="order-info">
                                    <span className="order-number">Pedido #00{el.id}</span>
                                    <span className="order-date">Realizado el {el.date_sale}</span>
                                    <span className="order-date">Dirección de Entrega: {el.address}</span>
                                </div>
                                <div className="order-status shipped">
                                    En camino
                                </div>
                                <div className="order-total">
                                    ${el.total}
                                </div>
                            </div>
                            {el.order_shoes.map((item: any) => (
                                <div className="order-products" key={item.id}>

                                    <div className="product-item">
                                        <img src={'http://localhost:5000' + item.shoe.images[0].url} alt="Puma RS-X" />
                                        <div className="product-details">
                                            <h3>{item.shoe.name}</h3>
                                            <p>Talla: 39 · Color: Negro/Azul</p>
                                            <div className="product-price">${item.shoe.price}</div>
                                        </div>
                                        <div className="product-quantity">x{item.quantity}</div>
                                        <div className="product-quantity"> =${item.subtotal}</div>    
                                    </div>
                                </div>
                            ))}


                            <div className="order-actions">
                                <button className="action-btn">Seguimiento</button>
                                <button className="action-btn outline">Contactar</button>
                            </div>
                        </div>
                    ))

                    }

                </div>
            </div>


        </>
    )
}