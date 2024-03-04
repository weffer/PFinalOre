import CartDetail from "../CartDetail/CartDetail"
import { useCart } from "../../Hooks/useCart";
import CartResume from "../CartResume/CartResume";
import Checkout from "../../components/Checkout/Checkout"

const Cart = () => {

   //llamando al customHook que tiene la referencia al contexto
   const { cartItems, totalPrice } = useCart();
  
  return (
    <section className="container-xl mt-5">
      <h2 className="fw-bold text-center">Carrito de Compras</h2>
      <div className="row mt-5">
        <div className="col-md-8 bg-white rounded-4 shadow">
          <CartDetail/>
          {
            cartItems?.length > 0 && 
            (
              <div className="total">
                <p>Total: $<span id="total">{totalPrice}</span> </p>                      
              </div>
            )
          }          
        </div>
        {
          cartItems?.length > 0 && 
          (
            <CartResume/>
          )
        }        
      </div>


      <Checkout/>


    </section>
    
    /*
    
    */
  )
}

export default Cart
