import { useProducts } from "../../Hooks/useProducts";
import CartWidget from "../CartWidget/CartWidget";
import Category from "../Category/Category";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";



const NavBar = () => {

  const { products } = useProducts({}); 

  return (
    <header className="py-5">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <Link to={'/'} className="text-decoration-none logo">
              <img src="/logo.webp" alt="logo" className="img-fluid" width="120px"/>
            </Link>
          </div>
          <nav className="col-md-6 d-flex flex-column align-items-center mt-5 mt-md-0 flex-md-row justify-content-md-end menu">
            <NavLink
              className="d-block px-2 py-1 text-decoration-none fs-6 fw-bold text-uppercase text-black"
              to={'/'}
            >
              Inicio
            </NavLink>
            <NavLink
              className="d-block px-2 py-1 text-decoration-none fs-6 fw-bold text-uppercase text-black"
              to={'/nosotros'}
            >
              Nosotros
            </NavLink>            
            <NavLink
              className="d-block px-2 py-1 text-decoration-none fs-6 fw-bold text-uppercase text-black"
              to={'/blog'}
            >
              Blog
            </NavLink>
            <NavLink
              className="d-block px-2 py-1 text-decoration-none fs-6 fw-bold text-uppercase text-black"
              to={'/contactanos'}
            >
              Conctactanos
            </NavLink>
            
            <Category/>
            
            <CartWidget />
          </nav>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-6 fw-bold text-primary">
              Escritorio Eléctrico
            </h1>
            <p className="mt-5 fs-5 text-black px-3 productoPrincipal">
              Todos nuestros escritorios de oficina o de Home Office han sido
              diseñados según normas ISO, respetando las principales dimensiones
              sugeridas por la norma. Así mismo nuestros diseños se caracterizan
              por ser exclusivos, elegantes, ligeros visualmente, funcionales ,
              escalables (crecen junto contigo) y de gran robustez estructural.
            </p>
            <p className="text-primary fs-1 fw-back">120$</p>            
            <Link to={`/detalle/${products[Math.floor(Math.random() * products.length)]?.id}`}
              className="btn fs-4 bg-primary text-white py-2 px-5 producto"
              id="btn_prod"            
            >
              Ver Producto
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
