import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Shop from "./pages/shop/Shop"
import MainLayout from "./layouts/MainLayout"
import { DetailProduct } from "./pages/detail/DetailProduct"
import { Cart } from "./pages/cart/Cart"
import { Checkout } from "./pages/checkout/Checkout"
import { Success } from "./pages/checkout/Success"

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop/>}/>
            <Route path="product/:id" element={<DetailProduct/>}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="payment/success" element={<Success/>}/>
        </Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
