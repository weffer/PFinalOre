import { useParams } from "react-router-dom";
import { getImageURL } from "../../utils/image-util";

import { useProductDetail } from "../../Hooks/useProductDetail";
import { useProductCount } from "../../Hooks/useProductCount";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import { useCart } from "../../Hooks/useCart";

function ItemListDetail() {
    
  const { id } = useParams();
  const { detail, loading } = useProductDetail({id});
  const { count, handleIncrement, handleDecrement } = useProductCount({detail});

  //llamando al customHook que tiene la referencia al contexto
  const { addItem, cartItems } = useCart();


  const handleSubmit = (event, detail)=> {
    event.preventDefault();    
    //agregando item al contexto
    addItem({ detail, count });
  }

  return (   
    
    loading ? 
    (
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) :
    (

        detail ?
        (
            <section className="container-xl mt-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-7">
                    <div id="indicadores" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button
                                className="active"
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="0"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="3"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            {
                                detail.galeria &&
                                (
                                    <>
                                        <div className="carousel-item active">
                                            <img src={getImageURL(detail.galeria[0])} alt="" className="d-block w-100" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={getImageURL(detail.galeria[1])} alt="" className="d-block w-100" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={getImageURL(detail.galeria[2])} alt="" className="d-block w-100" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={getImageURL(detail.galeria[3])} alt="" className="d-block w-100" />
                                        </div>
                                    </>
                                )
                            }
                            <button
                                type="button"
                                className="carousel-control-prev"
                                data-bs-target="#indicadores"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>

                            <button
                                type="button"
                                className="carousel-control-next"
                                data-bs-target="#indicadores"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-7 mt-5">
                    <h2 className="text-center fw-bold">{detail.nombre}</h2>
                    <p className="mt-5 fs-5">
                        {detail.descripcion}
                    </p>                

                    <p className="mt-5 fs-5 fw-bold">
                        {detail.titulo}
                    </p> 

                    <p className="mt-5 fs-5 fw-bold">
                        Stock : { detail.stock === 0 ? (<span className="form-text text-danger">producto sin stock</span>)  :  detail.stock}
                    </p>               
                    {
                        detail.caracteristicas &&
                        (
                            <>
                                <p className="mt-5 fs-5">
                                    {detail.caracteristicas[0]}
                                </p>
                                <p className="mt-5 fs-5">
                                    {detail.caracteristicas[1]}
                                </p>
                            </>
                        ) 
                    } 
                    <p className="fw-bold text-primary fs-3 text-center">$ {detail.precio}</p>

                    <form className="row" onSubmit={(e) => handleSubmit(e,detail)}>
                        <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="cbCantidad" className="form-label fw-bold"
                            >Cantidad</label>
                            <div className="productCount col-3 mx-auto">
                                <button className="btn btn-danger" onClick={(event)=> handleDecrement(event) }>-</button>
                                <strong>{count}</strong>
                                <button className="btn btn-success" onClick={(event)=> handleIncrement(event)}>+</button>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 mt-3 d-grid">
                        {
                            cartItems?.some(item => item.id === detail.id) ?
                            (
                                <>
                                    <input
                                        type="submit"
                                        value="Agregar"
                                        className="btn btn-primary px-4 text-white fw-bold"
                                        disabled={detail.stock === 0 ? 'disabled' : ''}
                                    />
                                    <Link to={'/cart'} className="btn text-bg-danger mt-2 fw-bold">
                                    Ir a Carrito
                                    </Link>
                                    <Link to={'/'} className="btn text-bg-dark mt-2 fw-bold">
                                    Seguir comprando
                                    </Link>
                                </>
                            ) :
                            (
                                <>
                                    <input
                                        type="submit"
                                        value="Agregar"
                                        className="btn btn-primary px-4 text-white fw-bold"
                                        disabled={detail.stock === 0 ? 'disabled' : ''}
                                    />
                                     {detail.stock === 0 && 
                                     (<Link to={'/'} className="btn text-bg-dark mt-2 fw-bold">
                                        Seguir comprando
                                    </Link>)}
                                </>
                            )
                        }
                        
                        </div>
                    </form>
                    </div>
                </div>
                <ToastContainer />
                </section>
        ):
        (
            <div className="container mt-4">
                <div className="row">
                    <div className="col">                   
                    <div className="alert alert-danger mt-3" role="alert">
                        <strong>Error:</strong> Detalle de producto no existe.
                    </div>
                    </div>
                </div>
            </div>
        )
    )  
  )
}

export default ItemListDetail
