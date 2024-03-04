import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="error-container text-center">
            <h1 className="display-1">404</h1>
            <p className="lead">Lo sentimos, la página que estás buscando no existe.</p>
            <p>Por favor, verifica la URL ingresada o vuelve a la <Link to={"/"}>página principal</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
