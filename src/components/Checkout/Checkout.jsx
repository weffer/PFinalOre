import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { useCart } from "../../Hooks/useCart";
import { useState } from "react";
import { db } from "../../firebase/config"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Checkout = () => {

    const { cartItems,totalPrice, clear } = useCart();

    const [tarjeta, setTarjeta] = useState("");
    const [titular, setTitular] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [error, setError] = useState("");


  function handleSubmit(event){
    
    event.preventDefault();

    if( !tarjeta || !titular || !telefono || !email || !emailConfirm)
    {      
      setError("Completar los campos requeridos")
      return;
    }

    if(!/^[0-9]+$/.test(tarjeta))
    {
      setError("Ingresar solo numero en la tarjeta de credito");
      return;
    }

    if(!/^[0-9]+$/.test(telefono))
    {
      setError("Ingresar solo numero para el telefono");
      return;
    }

    if(email !== emailConfirm){
      setError("Los campos del email no coinciden!!");
      return;
    }
    
    const orden = {
        items: cartItems.map((producto) => ({
            id : producto.id,
            nombre : producto.nombre,
            cantidad : producto.cantidad
        })),
        total : totalPrice,
        fecha : new Date(),
        tarjeta : tarjeta,
        titular : titular,        
        telefono: telefono,
        email: email
    };
    

    Promise.all(
        orden.items.map(async (productoOrden) => {
            const productoRef = doc(db,"productos", productoOrden.id);
            const productoDoc = await getDoc(productoRef);
            const stockProductRef = productoDoc.data().stock;


            if(stockProductRef >= productoOrden.cantidad){
              await updateDoc(productoRef, {
                stock : stockProductRef - productoOrden.cantidad
              })
            } else{
              throw new Error(`No hay suficiente stock para el producto <strong>${productoOrden.id} - ${productoOrden.nombre}</strong>`);
            }
        })
    )
    .then(()=> {
        addDoc(collection(db,"ordenes"), orden)
        .then((docRef) => {
            setError("");            
            clear();

            withReactContent(Swal).fire({
              title: <i>Gracias por su compra</i>,
              allowOutsideClick: false,
              html: `Su Nro de Orden es : <strong>${docRef.id}</strong>`,              
              preConfirm: () => { 
                window.location.href = '/';
              },
            })
        })
        .catch((error) => {
            console.lo(error);
        })
    })
    .catch((error) => {
      withReactContent(Swal).fire({html: `${error.message}` });
    })
  }

  return (    
    <div
      className="modal fade"
      id="paymentModal"
      tabIndex="-1"
      aria-labelledby="paymentModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="paymentModalLabel">
              Ingrese los datos de pago
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="creditCardTarjeta" className="form-label"
                  >Número de Tarjeta de Crédito</label
                >
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-credit-card"></i></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="creditCardTarjeta" 
                      onChange={(e) => setTarjeta(e.target.value)}  
                      placeholder="0000 0000 0000 0000"/>
                </div>                
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolderTitular" className="form-label"
                  >Titular de la Tarjeta</label
                >
                <input
                  type="text"
                  className="form-control"
                  id="cardHolderTitular"
                  onChange={(e) => setTitular(e.target.value)}                  
                  placeholder="Nombre Apellido"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolderTelefono" className="form-label"
                  >Telefono</label
                >
                <input
                  type="text"
                  className="form-control"
                  id="cardHolderTelefono"
                  onChange={(e) => setTelefono(e.target.value)}                  
                  placeholder="Telefono"
                  required
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolderEmail" className="form-label"
                  >Email</label
                >
                <input
                  type="email"
                  className="form-control"
                  id="cardHolderEmail"
                  onChange={(e) => setEmail(e.target.value)}                  
                  placeholder="Email"
                  required
                />                
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolderEmailConfirm" className="form-label"
                  >Confirmación Email</label
                >
                <input
                  type="email"
                  className="form-control"
                  id="cardHolderEmailConfirm"
                  onChange={(e) => setEmailConfirm(e.target.value)}                  
                  placeholder="Confirmacion de Email"
                  required
                />                
              </div>
              <div className="form-text text-danger">{error && <p>{error}</p>}</div>                  
              <button
                type="submit"
                className="btn btn-primary"
              >
                Procesar Pago
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
