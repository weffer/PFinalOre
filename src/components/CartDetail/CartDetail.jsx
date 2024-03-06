import { useCart } from "../../Hooks/useCart";
import { getImageURL } from "../../utils/image-util";
import { Link } from "react-router-dom";


const CartDetail = () => {

  //llamando al customHook que tiene la referencia al contexto
  const { cartItems,removeItem,updateIncremetProduct,updateDecrementProduct } = useCart();

  function handleClickDelete({id}){      
    removeItem(id);
  } 

  return (
    cartItems?.length > 0 ?
    (
      cartItems.map(item => {
        return (          
          <div key={item.id} className="row carrito align-items-center">
            <div className="col-auto">
              <Link to={`/detalle/${item.id}`} target="_blank" rel="noopener noreferrer">
                <img className='img-fluid producto' src={getImageURL(item.imagen)} alt='AAA'/>
              </Link>
            </div>
            <div className="col h-100">
              <p className="p-2 overflow-auto">{item.descripcion}</p>
            </div>
            <div className="col">
              <h5>                
                <Link to={`/detalle/${item.id}`} target="_blank" rel="noopener noreferrer">
                  {item.nombre}
                </Link>                
              </h5>
              <p>Precio: ${item.precio}</p>
              
              <p>Cantidad: <button className="btn btn-danger btn-sm" onClick={()=> updateDecrementProduct(item.id, 1)}>-</button><strong className="m-1">{item.cantidad}</strong><button className="btn btn-success btn-sm" onClick={()=> updateIncremetProduct(item.id, 1)}>+</button></p>              
              <p>${item.precio * item.cantidad}</p>
            </div>
            <div className="col-auto">                            
                <button className="deleteCard border-0 bg-transparent" onClick={() => handleClickDelete(item)} title="Eliminar producto">
                  <i className="bi bi-trash eliminar"></i>
                </button>                            
            </div>
          </div>
        )
      })
    ) :
    (      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="error-container text-center">
              <h1>Carrito vacio</h1>
              <p className="lead">Lo sentimos, no hay productos agregados vuelva a verificar.</p>
              <p>Por favor, Visitar el catalogo <Link to={"/"}>productos</Link>.</p>
            </div>
          </div>
        </div>
      </div>    
    )
  )
}

export default CartDetail
