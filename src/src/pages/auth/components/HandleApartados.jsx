import { useTicket } from "../../../hooks/useTicket";

export const HandleApartados = ({ticketsApartados, note=''}) => {

    const { startBuying, startDeleting } = useTicket();

    const isCompra = (e) => {
        e.preventDefault();
        startBuying(e);
    }

    const isDel = (e) => {
        e.preventDefault();
        startDeleting(e);
    }

    const fechaActual = new Date();

    console.log(ticketsApartados);
    
    return (
        <div className="container-info text-center">
        {
            ticketsApartados.map((e, i) => {
                let fecha = '';
                (e.fecha) ? fecha = new Date(e.fecha) : fecha = new Date(e.fechaApartado);
                const auxfecha = new Date(e.fecha);
               auxfecha.setHours(fecha.getHours()+12);
                const formato = e.numero.toString().padStart(5, '0');
                if(fechaActual < auxfecha){
                    return (
                        <div className="m-1 ticket-apartado user-apartado" key={i}>
                            {(note == '') ? <></> : <p className="text-uppercase">{note}</p>}
                            {(note == '') ? <h6>{e.usuario}</h6> : <></>}
                            <p>{e.telefono}</p>
                            <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                            <p>{new Date(fecha).toLocaleDateString()}</p>
                            <div className="d-flex justify-content-between">
                                <button id={JSON.stringify(e)} onClick={isCompra}><i className="fa-solid fa-square-check"></i></button>
                            </div>
                        </div>
                   )
                } else {
                    return (
                        <div className="m-1 ticket-apartado user-vencido" key={i}>
                            {(note == '') ? <></> : <p className="text-uppercase">{note}</p>}
                            {(note == '') ? <h6>{e.usuario}</h6> : <></>}
                            <p>{e.telefono}</p>
                            <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                            <p>{new Date(fecha).toLocaleDateString()}</p>
                            <div className="d-flex justify-content-between">
                                <button id={JSON.stringify(e)} onClick={isCompra}><i className="fa-solid fa-square-check"></i></button>
                                <button id={JSON.stringify(e)} onClick={isDel}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                   )
                }
            })
        }
    </div>
)}