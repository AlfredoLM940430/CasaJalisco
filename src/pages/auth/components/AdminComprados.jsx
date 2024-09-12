import { useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';

export const AdminComprados = () => {

    const [celValid, setCelValid] = useState('');
    const [ticketValid, setTicketValid] = useState('');

    const setPhone = (e) => {
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setCelValid(number);
    }

    const setTicket = (e) => {
        if(e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
        let ticket = e.target.value.replace(/\D/g, '');
        if(Number(ticket) > 60000) {
            Swal.fire({
                icon: "warning",
                text: "Numero fuera de rango",
            });
            setTicketValid('');
            return;
        }
        setTicketValid(ticket);
    }

    const onBuyingAdmin = () => {
        
    }

    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-green" />
                        <h4 className="text-center title p-2">Comprar Ticket</h4> 
                        <hr className="m-0 hr-green" />
                    </div>
                </div>
                <div className="n-ticket">
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Telefono" value={celValid} onChange={setPhone}/>
                        <input className="form-control" type="tel" placeholder="Boleto" value={ticketValid} onChange={setTicket}/>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button className="text-center btn btn-primary" onClick={onBuyingAdmin}>Comprar Boleto</button>
                </div>
            </div>

        </>
)}