import { getImageURL } from "../../utils/image-util"

function Nosotros() {
  return (
    <section className="container-xl mt-5">
      <h2 className="text-center fw-bold">Sobre Nosotros</h2>
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <p className="fs-5">
            Hacia fines de la década del setenta, la compañía acentúa sus
            procesos de investigación y desarrolla importantes lazos con los
            principales exponentes de la industria colchonera mundial, en
            Europa. Producto de la transferencia tecnológica y de la creación,
            adaptación y desarrollo de estándares para los perfiles de
            consumidores latinoamericanos, Rosen afianza su liderazgo
            convirtiéndose en el principal exponente en Chile de colchones, box
            spring y accesorios para el descanso.
          </p>

          <p className="fs-5">
            A principios de los años noventa, la compañía, que ya realizaba
            crecientes exportaciones hacia otros países de América del Sur,
            comienza a formalizar su internacionalización, consolidando
            operaciones en Argentina, Bolivia y Uruguay, para posteriormente
            hacer lo propio en Paraguay, Perú y Brasil.
          </p>
        </div>
        <div className="col-md-6 mt-5 mt-md-0">
          <img className="img-fluid" src={getImageURL("Nosotros1.webp")} alt="nosotros" />
        </div>
        <div className="col-md-6 mt-5">
          <img className="img-fluid" src={getImageURL("Nosotros2.webp")} alt="nosotros" />
        </div>
        <div className="col-md-6 mt-5 mt-md-0">
          <p className="fs-5">
            Un compromiso con la calidad total. Apegada desde siempre a
            estrictas normas de Calidad Total, Rosen ha establecido los más
            altos estándares en todas las etapas de su quehacer productivo y de
            servicio al consumidor. Así desde la selección de sus materias
            primas y proveedores, hasta la capacitación de su personal, pasando
            por la instalación de la más avanzada maquinaria y el cultivo de un
            estilo propio de servicio al consumidor, la Calidad Total ha sido
            desde siempre el Norte de esta empresa y su gente.
          </p>

          <p className="fs-5">
            Gracias a este nivel de exigencia es que en el Centro de
            Investigaciones Tecnológicas, y en sus plantas industriales, han
            nacido las más completas, confiables y exitosas líneas de producto
            destinadas a un descanso diseñado científicamente para toda la
            familia.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Nosotros