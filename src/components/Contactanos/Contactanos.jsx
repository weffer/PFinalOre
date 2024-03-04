function Contactanos() {
  return (
    <section className="container-xl mt-5">
      <h2 className="fw-bold text-center">Contactanos</h2>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7327037.563551748!2d12.039994013787668!3d26.27285628199924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892d98ece010d%3A0xfa076041c7f9c22a!2sLibia!5e0!3m2!1ses!2spe!4v1692922109711!5m2!1ses!2spe"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="col-md-8">
          <div className="contact-form">
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary text-white px-5 fw-bold"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contactanos