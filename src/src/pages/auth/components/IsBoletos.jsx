import { useEffect, useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { HandleComprados } from "./HandleComprados";
import { HandleApartados } from "./HandleApartados";

export const IsBoletos = () => {

    const { startFindByTicked, ticketsID } = useAdminStore();
    const [isValid, setIsValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [ticket, setTicket] = useState([]);
    
    const findBoleto = async(e) => {

        if(e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
        let ticket = e.target.value.replace(/\D/g, '');
        if(Number(ticket) > 60000) {
            Swal.fire({
                icon: "warning",
                text: "Numero fuera de rango",
            });
            setIsValid('');
            return;
        }
        setIsValid(ticket);
    }

    const startFindUser = async () => {
        let ticket = {boleto: isValid}
        let response = await startFindByTicked(ticket);
        if(response.ok === false) {
            Swal.fire({
                icon: "warning",
                text: response.msg,
            });
        }
        setIsValid('');
        setIsDisabled(true)
    }

    useEffect(() => {
        if(isValid == '') {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [isValid]);

    useEffect(() => {
        if(ticketsID.boletoID != undefined) {
            let aux = [];
            aux.push(ticketsID.boletoID);
            setTicket(aux);
        }
    }, [ticketsID]);
    

    console.log(ticket);
    
    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-purple" />
                        <h4 className="text-center title p-2">Buscar boleto</h4> 
                        <hr className="m-0 hr-purple" />
                    </div>
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Boleto" value={isValid} onChange={findBoleto}/>
                    </div>
                    <div className="d-flex text-center mt-3">
                        <button className="m-auto btn btn-dark" disabled={isDisabled} onClick={startFindUser}>Buscar Boleto</button>
                    </div>
                </div>
                {(Object.keys(ticketsID).length > 2) ? 
                (<div className="isTrue p-5 text-white">
                    <div className="info-card-admin">
                        <p className="pt-2"> <i className="fa-solid fa-user"></i> Nombre: <span>{ticketsID.usuario.nombre} {ticketsID.usuario.apellido}</span></p>
                        <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span>{ticketsID.usuario.telefono}</span></p>
                        <p className="pb-2"> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span>{ticketsID.usuario.estado}</span></p>
                        {(ticketsID.boletoID.estado == 'comprado') ? <HandleComprados telefono={ticketsID.usuario.telefono} ticketsComprados={ticket} note={ticketsID.boletoID.estado}/> : <HandleApartados ticketsApartados={ticket} note={ticketsID.boletoID.estado}/> }
                        <hr />
                    </div>
                </div>): (<></>)}
            </div>
        </>
)}