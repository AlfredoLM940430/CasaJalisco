import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar"

export const MiBoleto = () => {

    const celular = ['3311486142','3333333333'];

    const [isboleto, setIsboleto] = useState(false);
    const [isValid, setIsValid] = useState('');
    
    const findCel = (e) => {
        setIsboleto(false);
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
    }

    useEffect(() => {
        if(celular.includes(isValid)) {
            setIsboleto(true);
            setIsValid('');
            return;
        }
        if(isValid.length >= 10 && !celular.includes(isValid)) {
            Swal.fire("Numero no econtrado");
            setIsValid('');
        }
    }, [isValid])

    return (
        <>
            <header>
                <NavBar/>
                <div id="Boletos" className="d-flex justify-content-center">
                    <div className="align-self-center">
                        <h5 className="text-center p-4">
                            <i className="fa-solid fa-clover"/> Mi Boleto <i className="fa-solid fa-clover"/>
                        </h5>
                    </div>
                </div>
            </header>

            <div className="n-ticket">
                <h4 className="text-center title m-4">Ingresa tu Celular</h4> 
                <div className="container d-flex justify-content-center mb-5">
                    <input className="form-control" type="tel" value={isValid} onChange={findCel}/>
                </div>
            </div>

            <hr />

            {
                isboleto ? 
                (<>
                <div className="aux"></div>
                <div className="d-flex justify-content-center">
                    <div className="ticket container">
                        <div className="left"></div>
                        <div className="right"></div>
                        <div className="ticket-content-wrapper"></div>
                    </div>
                
                    <div className="datos container">
                        <div className="boleto-title">
                        <picture>
                            <source srcSet="/img/lotto-image.avif" type="image/avif"/>
                            <source srcSet="/img/lotto-image.webp" type="image/webp"/>
                            <img src="/img/lotto-image.png" alt="Imagen React" className=""/>
                        </picture>
                            <h4>$50,000<span>MXN</span></h4>
                        </div>
                        <hr  />
                        <p className="text-center casa-jalisco">Casa Jalisco</p>
                        <div className="ticket-cuerpo">
                            <p className="m-0 p-0">Nombre: <span>José Alfredo</span></p>
                            <p className="m-0 p-0">Apellido: <span>López Mares</span></p>
                            <p className="m-0 p-0">Estado: <span>Jalisco</span></p>
                            <p className="m-0 p-0">Pagado: <span>Pagado</span></p>
                        </div>
                        <div className="nnn">
                            <hr className="hr-fnl" />
                            <p className="m-0 text-center">Numeros:</p>
                            <p className="m-0 text-center n-boletos">
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                                &#60;<span>0001</span>&#62;
                            </p>
                        </div>
                    </div>
                </div>
                </>)
                :(<div className="no-ticket"></div>)
            }
        <Footer/>
        </>
)}