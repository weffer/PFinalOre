import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ErrorPage from "./components/ErrorPage";
import ItemListDetail from "./components/ItemListDetail/ItemListDetail";
import Nosotros from "./components/Nosotros/Nosotros"
import Blog from "./components/Blog/Blog"
import Contactanos from "./components/Contactanos/Contactanos"
import Cart from "./components/Cart/Cart"

import { BrowserRouter, Routes,Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer/>}/>
            <Route path="/nosotros" element={<Nosotros/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/contactanos" element={<Contactanos/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/detalle/:id" element={<ItemListDetail/>}/>
            <Route path="/categoria/:tipo" element={<ItemListContainer/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
