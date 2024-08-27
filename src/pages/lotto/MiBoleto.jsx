import { useEffect, useState } from "react";
import { useLottoStore } from "../../hooks/useLottoStore";
import { NoComprados } from "./components/NoComprados";

export const MiBoleto = () => {

    // API
    const { startFindBoletos, boletos_usuarios } = useLottoStore();
    const [isValid, setIsValid] = useState('');
    
    const findCel = async(e) => {
        //setIsboleto(false);
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
        if(number.length === 10) {
            e.target.blur();
            let form = {telefono: number}
            let response = await startFindBoletos(form);
            if(response.ok === false) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: response.msg,
                });
            }
            setIsValid('');
        }
    }    
    const aux = (Object.keys(boletos_usuarios).length > 0) ? boletos_usuarios : '';

    useEffect(() => {
        console.log(aux);
        if(aux !== '') {
            window.scroll({top: 300, behavior: "smooth"})
        }
    }, [boletos_usuarios]);

    return (
        <>
            <header>
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
                <div className="container d-flex justify-content-center">
                    <input className="form-control" type="tel" value={isValid} onChange={findCel}/>
                </div>
            </div>
            <div className="mt-1 p-0 boleto-dudas text-center">
                <a target="_blank" rel="noopener" href={"https://wa.me/+523311486142"}><i className="fa-brands fa-whatsapp"></i></a>
                <p>Tienes alguna duda?</p>
            </div>
            <hr id="info"/>

            {
                (aux.comprados !== undefined && aux.comprados.length > 0) ? 
                (<>
                <div className="isTrue mb-2">
                    {/* <h5>Premio: $50,000 MXN</h5> */}
                    <h5 className="mt-2">Mucha suerte! <i className="fa-solid fa-clover"/></h5>
                    <div className="info-card mb-4">
                        <h6 className="m-2">Resumen:</h6>
                        <p> <i className="fa-solid fa-user"></i> Nombre: <span>{`${aux.usuario.nombre + " " + aux.usuario.apellido}`}</span></p>
                        <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span>{`${aux.usuario.telefono}`}</span></p>
                        <p> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span>{`${aux.usuario.estado}`}</span></p>
                        <p> <i className="fa-solid fa-gift"></i> Premio: <span>$150,000</span></p>
                        <p> <i className="fa-solid fa-ticket"></i> Boletos Pagados: <span>{`${aux.comprados.length} Numeros `}<i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i></span></p>
                        {/* <h5 className="">Tus Boletos:</h5> */}
                        <div className="container-t">
                            {
                                aux.comprados.map((e) => {
                                    return (
                                        <div className="ticketN m-1" key={e}>
                                            <p className="serialN">{e}</p>
                                        </div>                                      
                                    )
                                })
                            }
                        </div>
                        { (aux.apartados.length > 0) ?
                            
                            (<>
                                <p><i className="fa-solid fa-ticket"></i> Boletos Apartados: <span>{`${aux.apartados.length} Numeros `}<i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i></span></p>
                                <p className="info-apartados">*Apurate a comprarlos o podrias perderlos <i className="fa-regular fa-clock"></i></p>
                                <div className="container-t">
                                    {
                                        aux.apartados.map((e) => {
                                            return (
                                                <div className="ticketN m-1" key={e}>
                                                    <p className="serialN">{e}</p>
                                                </div>                                      
                                            )
                                        })
                                    }
                                </div>
                            </>) : <></>
                        }
                    </div>
                </div>
                </>)
                : <NoComprados aux={aux}/>
            }
        </>
)}