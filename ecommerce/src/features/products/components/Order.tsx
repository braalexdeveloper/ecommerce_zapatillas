import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../../store";
import { setFilters,getProducts } from "../store/productSlice";
import { useEffect } from "react";





export const Order = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filters=useSelector((state:RootState)=>state.products.filters);

    

    const handleOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {

       
        dispatch(setFilters({...filters,order:event.target.value}))
       
    }

    useEffect(()=>{
         dispatch(getProducts(filters))
        console.log(filters)
    },[filters])

    return (
        <>
            <div className="sort-options">
                <label htmlFor="sort">Ordenar por:</label>
                <select id="sort" onChange={handleOrder}>
                    <option value="">Selecciona el orden</option>
                    <option value="asc">Precio: menor a mayor</option>
                    <option value="desc">Precio: mayor a menor</option>

                </select>
            </div>
        </>
    )
}