import {createContext, useEffect, useState} from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { toast } from 'react-toastify';

import confetti from 'canvas-confetti'

import { doc , getDoc } from "firebase/firestore";
import { db } from "../firebase/config"

const cartInitial = JSON.parse(window.localStorage.getItem('cart')) || [];

export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState(cartInitial);
    const [shoppingCartCount, setShoppingCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addItem = ({ detail, count }) => {
        const productIndex =cartItems.findIndex(item => item.id === detail.id);
        if(productIndex >= 0)
        {
            const productoRef = doc(db, "productos", detail.id);
            getDoc(productoRef).then((snapshot) => {
                if(snapshot.exists()){
                    const newProduct = [...cartItems];
                    if(newProduct[productIndex].cantidad + count <= snapshot.data().stock)
                    {
                        newProduct[productIndex].cantidad += count;
                        setCartItems(newProduct);
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                        toast.success('¡Se agrego el producto con éxito!', { autoClose: 3000 });
                    }else{
                        withReactContent(Swal).fire({
                            title: "Stock",
                            icon: 'warning',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            html: `Producto sin Stock : <strong>${snapshot.data().nombre}</strong> </br> Stock maximo permitido: <strong>${snapshot.data().stock}</strong> </br>
                                   Ya tienes agregado el producto <strong>${snapshot.data().nombre}</strong> en el carrito, con la cantidad de : <strong>${newProduct[productIndex].cantidad}</strong>.</br>
                                   ${(snapshot.data().stock - (newProduct[productIndex].cantidad + count)) < 0 ? 'La cantidad perimitada para agregar es : <strong>' + (snapshot.data().stock - (newProduct[productIndex].cantidad)) + '</strong>' : '' } `
                        })
                    }
                }
            }).catch((error) => {
                console.error("Error al obtener el documento:", error);
            });
        }else{
            setCartItems(oldProduct => (
                [
                    ...oldProduct,
                    {
                        ...detail,
                        cantidad : count
                    }
                ]
            ));
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            toast.success('¡Se agrego el producto con éxito!', { autoClose: 3000 });
        }

        
    }

    const removeItem = itemid => {       
        withReactContent(Swal).fire({
            title: '¿Estás seguro?',
            text: '¡Esta acción no se puede deshacer!',
            icon: 'warning',
            showCancelButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'            
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
                setCartItems(oldProduct => oldProduct.filter(item => item.id !== itemid));
            }
        });
        
    }

    const clear = () => {
        setCartItems([])
    }

    const updateIncremetProduct =(id, count) => {        
        const productIndex =cartItems.findIndex(item => item.id === id);
        if(productIndex >= 0)
        {
            const productoRef = doc(db, "productos", id);
            getDoc(productoRef).then((snapshot) => {
                if(snapshot.exists()){
                    const newProduct = [...cartItems];
                    
                    if(newProduct[productIndex].cantidad + count <= snapshot.data().stock)
                    {
                        newProduct[productIndex].cantidad += count;
                        setCartItems(newProduct);
                    }else{                        
                        withReactContent(Swal).fire({
                            title: "Stock",
                            icon: 'warning',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            html: `Producto sin Stock : <strong>${snapshot.data().nombre}</strong> </br> Stock maximo permitido: <strong>${snapshot.data().stock}</strong>`
                          })
                    }
                }
            }).catch((error) => {
            console.error("Error al obtener el documento:", error);
            });

            
        }
    }

    const updateDecrementProduct =(id, count) => {
        const productIndex =cartItems.findIndex(item => item.id === id);
        if(productIndex >= 0)
        {
            const newProduct = [...cartItems];
            if(newProduct[productIndex].cantidad > 1){
                newProduct[productIndex].cantidad -= count;
                setCartItems(newProduct);
            }else{
                withReactContent(Swal).fire({
                    title: '¿Estás seguro?',
                    text: '¡Esta acción no se puede deshacer!',
                    icon: 'warning',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo',
                    cancelButtonText: 'Cancelar'            
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');                        
                        setCartItems(oldProduct => oldProduct.filter(item => item.id !== id));
                    }
                });                
            }
            
        }
    }

    useEffect(()=> {
        //para agregar el total al widget
        setShoppingCartCount(cartItems.reduce((acumulador, item) => acumulador + item.cantidad, 0));

        //para agregar el preciototal en el detalle del carrito
        const priceTotal = cartItems?.reduce((acumulador, item) => {      
            return acumulador + (item.cantidad * item.precio);
          }, 0);
          
        setTotalPrice(priceTotal);

        //para setear un localstorage
        window.localStorage.setItem('cart', JSON.stringify(cartItems))

    }, [cartItems])

    
    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            clear,
            shoppingCartCount,
            totalPrice,
            updateIncremetProduct,
            updateDecrementProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}