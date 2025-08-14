import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Shop from "./pages/shop/Shop"
import MainLayout from "./layouts/MainLayout"
import { DetailProduct } from "./pages/detail/DetailProduct"
import { Cart } from "./pages/cart/Cart"
import { Checkout } from "./pages/checkout/Checkout"
import { Success } from "./pages/checkout/Success"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { Orders } from "./adminClient/orders/orders"
import { PrivateRoute } from "./adminClient/PrivateRoute"
import { PublicRoute } from "./pages/auth/PublicRoute"
import { SuccessGoogle } from "./pages/auth/SuccessGoogle"

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<DetailProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/success" element={<Success />} />
            <Route path="me" element={<SuccessGoogle/>} />

            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            {/* Rutas protegidas agrupadas */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="mis-pedidos" element={<Orders />} />
              {/* Puedes agregar más rutas aquí */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
