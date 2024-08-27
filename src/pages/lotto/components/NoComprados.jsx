export const NoComprados = ({aux}) => {

    if(!(aux.apartados === undefined)) {
        return (
            <div className="isTrue">
                <div className="info-card mb-4">
                    <h6 className="m-2">Resumen:</h6>
                    <p> <i className="fa-solid fa-user"></i> Nombre: <span>{`${aux.usuario.nombre + " " + aux.usuario.apellido}`}</span></p>
                    <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span>{`${aux.usuario.telefono}`}</span></p>
                    <p> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span>{`${aux.usuario.estado}`}</span></p>
                    <p><i className="fa-solid fa-ticket"></i> Boletos Apartados: <span>{`${aux.apartados.length} Numeros `}<i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i> <i className="fa-solid fa-hand-point-down"></i></span></p>
                    <p className="info-apartados">
                        *Solo cuentas con boletos apartados, apurate a comprarlos o podrias perderlos <i className="fa-regular fa-clock"></i>
                    </p>
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
                </div>   
            </div>
        );
    }

    return (
        <>
           <div className="no-ticket"></div> 
        </>
)}