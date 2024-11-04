import { NoComprados } from "./NoComprados"

export const ViewBoletos = ({aux}) => {
    return (
        <>
            {
                (aux.comprados !== undefined && aux.comprados.length > 0) ? 
                (<div className="isTrue mb-2">
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
                </div>) : <NoComprados aux={aux}/>
            }
        </>
)}