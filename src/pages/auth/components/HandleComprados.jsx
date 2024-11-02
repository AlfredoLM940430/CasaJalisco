export const HandleComprados = ({telefono, ticketsComprados, note=''}) => {    

    return (
        <div className="container-info text-center">
            {
                ticketsComprados.map((e, i) => {
                    let fecha = '';
                    (e.fecha) ? fecha = new Date(e.fecha) : fecha = new Date(e.fechaApartado);
                    const formato = e.numero.toString().padStart(5, '0');
                    return (
                        <div className="m-1 ticket-apartado user-comprado" key={i}>
                            {(note == '') ? <></> : <p className="text-uppercase">{note}</p>}
                            <p>{telefono}</p>
                            <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                            <p>{new Date(fecha).toLocaleDateString()}</p>
                        </div>
                    )
                })
            }
        </div>
)}