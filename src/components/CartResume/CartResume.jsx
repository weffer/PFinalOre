import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";


const CartResume = () => {

  //llamando al customHook que tiene la referencia al contexto
  const { clear,shoppingCartCount,totalPrice } = useCart();

  return (
    <div className="col-md-3 bg-white rounded-4 shadow ms-md-3 ms-0 mt-md-0 mt-2 h-100">
      <div className="bg-white p-3">
        <div className="text-center">
          <p className="text-center">
            Total({shoppingCartCount} {shoppingCartCount == 1 ? " producto" : " productos"}):<strong>${totalPrice}</strong>
          </p>
          <button className="btn btn-primary text-center m-2 fw-bold text-white btn-prod w-100" data-bs-toggle="modal" data-bs-target="#paymentModal">
            Proceder al pago
          </button>
          <Link to={'/'} className="btn btn-dark text-center m-2 fw-bold text-white btn-prod w-100">
            Seguir comprando
          </Link>
          <button className="btn btn-danger text-center m-2 fw-bold text-white btn-prod w-100" onClick={clear}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartResume
