import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, type RootState } from "../../../store"
import { useEffect, useState } from "react";
import { getBrands } from "../../brands/store/brandSlice";
import { getProducts } from "../store/productSlice";
import { getCategories } from "../../categories/store/CategorySlice";


export const Filters = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [brandsId,setBrandsId]=useState<string[]>([]);
    const [categoriesSelected,setCategoriesSelected]=useState<string[]>([]);

    const { brands, loading, error } = useSelector((state: RootState) => state.brandsReducer);

    const { categories,loading:loadingCategory }=useSelector((state:RootState)=>state.categories);

    const handdleBrand=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const id=e.target.value;
      if(e.target.checked){
        setBrandsId(prev=>[...prev,id])
      }else{
        setBrandsId(prev => prev.filter(el => el !== id));
      }
      
      
    }

    const handleCategory=(e:React.ChangeEvent<HTMLInputElement>)=>{
     if(e.target.checked){
       setCategoriesSelected(prev=>[...prev,e.target.value]);
     }else{
        setCategoriesSelected(prev=>prev.filter(el=>el!==e.target.value));
     }
    };

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());

        dispatch(getProducts({brands:brandsId.join(","),categories:categoriesSelected}));
        console.log(categoriesSelected)
    }, [brandsId,categoriesSelected])

    if(loading) <p>Cargando marcas...</p>
    if(loadingCategory) <p>Cargando categorias...</p>
    if(error) <p>{error}</p>
    return (
        <>
            <aside className="filters-sidebar">
                <div className="filter-section">
                    <h3>Categorías <i className="fas fa-chevron-down"></i></h3>
                    <div className="filter-content">
                        <ul className="filter-options">
                            {
                                categories.map(el=>(
                             <li key={el.id}>
                                <input type="checkbox" value={el.name} onChange={handleCategory} />
                                <label htmlFor="category-running">{el.name} <span className="count">(24)</span></label>
                            </li>
                                ))
                            }
                            
                            
                        </ul>
                    </div>
                </div>

                

                <div className="filter-section">
                    <h3>Marca <i className="fas fa-chevron-down"></i></h3>
                    <div className="filter-content">
                        <ul className="filter-options">
                            {
                                brands.map(el => (
                                    <li key={el.id}>
                                        <input type="checkbox" value={el.id} onChange={handdleBrand} />
                                        <label htmlFor="brand-nike">{el.name} <span className="count">(28)</span></label>
                                    </li>
                                ))
                            }


                        </ul>
                    </div>
                </div>

                <button className="filter-button">Aplicar Filtros</button>
            </aside>
        </>
    )
}