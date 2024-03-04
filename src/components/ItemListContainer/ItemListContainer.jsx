import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

import { useProducts } from "../../Hooks/useProducts";


const ItemListContainer = () => {

  const { tipo } = useParams();

  const { products, loading } = useProducts({tipo});

  return (
    <main className="container-xl mt-5">
      <hr className="border border-primary border-2 opacity-50" />
      <h2 className="text-center fw-bold">Nuestros Productos</h2>
      <div className="row mt-5">
      {

        loading ? 
        (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) :
        (
          products.length > 0 ? (
            products.map( product => {
              return (          
                <ItemList key={product.id} product={product}/>
              )
            })) : 
              (<div className="container mt-4">
                <div className="row">
                  <div className="col">                   
                    <div className="alert alert-danger mt-3" role="alert">
                      <strong>Error:</strong> Producto no existe.
                    </div>
                  </div>
                </div>
              </div>)
        )

        
      } 
      </div>
    </main>
  );
};

export default ItemListContainer;