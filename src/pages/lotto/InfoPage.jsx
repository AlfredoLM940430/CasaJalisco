import { Footer } from "../../components/Footer"
import { NavBar } from "../../components/NavBar"

export const InfoPage = () => {
    return (
        <>
            <header>
                <NavBar/>
                <div id="Boletos" className="d-flex justify-content-center">
                    <div className="align-self-center">
                        <h5 className="text-center p-4">Información de Pago</h5>
                    </div>
                </div>
            </header>

            <div className="info-comprobante">
                <div className="p-5 d-flex justify-content-center">
                    <div className="align-self-center">
                        <h6 className="text-center text-uppercase">Debes realizar el pago por alguna de éstas opciones y enviar tu</h6>
                        <h6 className="text-center text-uppercase">comprobante de pago al</h6>
                        <p className="text-center">
                            <i className="fa-brands fa-whatsapp fa-2xl"></i> Whatsapp (@@@) @@@@ @@@@
                        </p>
                    </div>
                </div>
            </div>

            <div className="info-box container">
                <div className="d-flex justify-content-center m-2">
                    <picture>
                        <source srcSet="/img/lotto-image.avif" type="image/avif"/>
                        <source srcSet="/img/lotto-image.webp" type="image/webp"/>
                        <img src="/img/lotto-image.png" alt="Imagen React" className="info-image"/>
                    </picture>
                </div>
                <div className="transfer container">
                    <h5 className="text-center title">**Exclusivo transferencias y cajero**</h5>
                    <h6 className="text-center text-uppercase">tu nombre en concepto de pago</h6>
                    <li className="ml-1"><span className="info-index">BANCO:</span> BBVA</li>
                    <li className="ml-1"><span className="info-index">NOMBRE:</span>  xxxx xxxxx xxxxx xxxx</li>
                    <li className="ml-1"><span className="info-index">CLABE:</span>  xxxx xxxxx xxxxx xxxx</li>
                    <br />
                    <li className="ml-1"><span className="info-index">BANCO:</span> BBVA</li>
                    <li className="ml-1"><span className="info-index">NOMBRE:</span>  xxxx xxxxx xxxxx xxxx</li>
                    <li className="ml-1"><span className="info-index">CLABE:</span>  xxxx xxxxx xxxxx xxxx</li>
                </div>
                <div className="transfer container">
                    <h5 className="text-center title">**Pago en OXXO, 7Eleven, Farmacias**</h5>
                    <li className="ml-1"><span className="info-index">BANCO:</span> BBVA</li>
                    <li className="ml-1"><span className="info-index">NUMERO DE TARJETA</span>  xxxx xxxxx xxxxx xxxx</li>
                    <br />
                    <li className="ml-1"><span className="info-index">BANCO:</span> BBVA</li>
                    <li className="ml-1"><span className="info-index">NUMERO DE TARJETA</span>  xxxx xxxxx xxxxx xxxx</li>
                </div>

                <h6 className="text-center box-saturada text-uppercase">si alguna cuenta aparece saturada por favor</h6>
                <h6 className="text-center box-saturada text-uppercase">intenta con otra</h6>
            </div>

            <div className="info-dudas">
                <div className="container">
                    <h4 className="text-center">Dudas o Preguntas? Click Aqui: </h4>
                </div>
                <a className="whats d-flex justify-content-center mt-4" href="#">
                    <i className="fa-brands fa-whatsapp fa-2xl"></i>
                </a>
            </div>
            <Footer/>
        </>
)}