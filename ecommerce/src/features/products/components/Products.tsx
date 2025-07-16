import { useDispatch, useSelector } from "react-redux"
import { ProductCard } from "./ProductCard"
import { type RootState } from "../../../store"
import { type AppDispatch } from "../../../store"
import { useEffect } from "react"
import { getProducts } from "../store/productSlice"

export const Products = () => {
  const dispatch=useDispatch<AppDispatch>();
  const {products,loading,error}=useSelector((state:RootState)=>state.products);

   useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <>
      <div className="products-grid">
        {products.map(p=>(
             <ProductCard product={p}/>
        ))}
        
      </div>
    </>
  )
}