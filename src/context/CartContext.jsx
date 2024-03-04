import {createContext, useEffect, useState} from "react";

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
            const newProduct = [...cartItems];
            newProduct[productIndex].cantidad += count;
            setCartItems(newProduct);
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
        }

        
    }

    const removeItem = itemid => {
        setCartItems(oldProduct => oldProduct.filter(item => item.id !== itemid));
    }

    const clear = () => {
        setCartItems([])
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
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}