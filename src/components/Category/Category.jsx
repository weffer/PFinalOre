import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "../../Hooks/useProducts";

function Category() {

  const [category, setcategory] = useState([]);
  const { products } = useProducts({});

  useEffect(()=> {    
    
     const productsGetCategory = products.reduce((unique, item) => {
                                    return unique.includes(item.categoria) ? unique : [...unique, item.categoria];
                                }, []);
     setcategory(productsGetCategory);     

  },[products])
  
  
  return (
    <ul className="navbar-nav">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle fw-bold" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                CATEGORIA
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {
                    category.map((cate,index) => (
                        <li key={index}><Link className="dropdown-item" to={`/categoria/${cate}`}>{cate}</Link></li>
                    ))
                }
            </ul>
        </li>
    </ul>
  )
}

export default Category