import { useDispatch } from "react-redux"
import { type AppDispatch } from "../../../store";
import { getProducts } from "../store/productSlice";


export const Order = () => {
    const dispatch=useDispatch<AppDispatch>();

    const handleOrder=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        const order=event.target.value;
        dispatch(getProducts({order}));
    }
    return (
        <>
            <div className="sort-options">
                <label htmlFor="sort">Ordenar por:</label>
                <select id="sort" onChange={handleOrder}>
                    
                    <option value="asc">Precio: menor a mayor</option>
                    <option value="desc">Precio: mayor a menor</option>
                    
                </select>
            </div>
        </>
    )
}