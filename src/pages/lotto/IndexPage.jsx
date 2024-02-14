import { NavLink } from "react-router-dom"
import { NavBar } from "../../components/NavBar"
import { Footer } from "../../components/Footer"
import { HashLink } from "react-router-hash-link"

export const IndexPage = () => {
    return (
        <>
            <header className="lotto-header">
                <NavBar/>
                <div className="container d-flex justify-content-center">
                    <HashLink className="btn btn-disponibles text-white" to="/boletos#BoletosId">-Lista de Disponibles-</HashLink>
                </div>
            </header>

            <main>

            <div id="Nosotros">
                <h2 className="text-center p-4">Acerca de Nosotros</h2>
                <div className="container p-5 d-flex justify-content-center info-section">
                    <div className="align-self-center">
                        <p className="text-center">SORTEOS ENTRE AMIGOS EN BASE A LOTERIA NACIONAL</p>
                        <p className="text-center">ARRIESGA POCO Y GANA MUCHO!</p>
                        <p className="text-center"><span>Todos nuestros sorteos tiene causa social.</span></p>
                    </div>
                </div>
            </div>

            <div id="Contacto">
                <h2 className="text-center p-4">Contacto</h2>
                <div className="container p-5 d-flex justify-content-center info-section">
                    <div className="align-self-center">
                        <p className="text-center contacto-info">Whatsapp (@@@) @@@@ @@@@</p>
                        <p className="text-center">ARRIESGA POCO Y GANA MUCHO!</p>
                        <p className="text-center">Información o Dudas en:</p>
                        <div className="text-center pt-2">
                            {/* <a className="m-2" 
                                href="https://wa.me/+523322363754?text=I'm%20inquiring%20about%20the%20apartment%20listing">
                                <i className="fa-brands fa-whatsapp fa-2xl"></i>
                            </a> */}
                            <a className="m-2" href="#"><i className="fa-brands fa-whatsapp"></i></a>
                            <a className="m-2" href="#"><i className="fa-brands fa-facebook"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Preguntas">
                <h2 className="text-center p-4">Preguntas</h2>

                <div className="container p-5 d-flex justify-content-center">
                    <div className="align-self-center">
                        <div className="container">
                            <h6 className="text-center">¿CÓMO SE ELIGE A LOS GANADORES?</h6>
                            <p className="text-center">Todos nuestros sorteos se realizan en base a la Lotería Nacional para la Asistencia Pública mexicana.​</p>
                            <p className="text-center">El ganador de Casa Jalisco será el participante cuyo número de boleto coincida con las últimas cifras del primer premio ganador de la Lotería Nacional (las fechas serán publicadas en nuestra página oficial).​</p>
                            
                            <h6 className="text-center mt-5">¿QUÉ SUCEDE CUANDO EL NÚMERO GANADOR ES UN BOLETO NO VENDIDO?</h6>
                            <p className="text-center">Se elige un nuevo ganador realizando la misma dinámica en otra fecha cercana (se anunciará la nueva fecha).​</p>
                            <p className="text-center">Esto significa que, ¡Tendrías el doble de oportunidades de ganar con tu mismo boleto!​</p>

                            <h6 className="text-center mt-5">¿DÓNDE SE PUBLICA A LOS GANADORES?</h6>
                            <p className="text-center">En nuestra página oficial de Facebook Casa Jalisco puedes encontrar todos y cada uno de nuestros sorteos anteriores, así como las transmisiones en vivo con Lotería Nacional y las entregas de premios a los ganadores!​</p>
                            <p className="text-center">Esto significa que, ¡Tendrías el doble de oportunidades de ganar con tu mismo boleto!​</p>
                        </div>

                        <hr></hr>

                        <div className="container mt-5">
                            <p className="text-center">
                                <span>Encuentra transmisión en vivo de los sorteos en nuestra página de Facebook en las fechas indicadas a las 20:00 hrs CDMX. ¡No te lo pierdas!</span></p>
                        </div>
                    </div>
                </div>

            </div>

            </main>
            <Footer/>
        </>
)}