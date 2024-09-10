import { useEffect, useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { HandleApartados } from "./HandleApartados";

export const IsApartado = () => {

    const { apartados, startFindApartados, updateFindApartados, savedTicket, deletedTicket, resetSD } = useAdminStore();
    const [dateTickets, setDateTickets] = useState([]);
    
    useEffect(() => {
        if(apartados.length > 0) return;
        async function fetchData() {
            let response = await startFindApartados();
            console.log(response);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(Object.keys(apartados).length > 0) {
            let tickets = [...apartados];
            setDateTickets(sortByDate(tickets));
        }
    }, [apartados]);
    
    const sortByDate = (data) => data.sort(({fecha: a}, {fecha: b}) => a < b ? -1 : a > b ? 1 : 0); 
    
    useEffect(() => {
        if(Object.keys(savedTicket).length !== 0 && typeof(savedTicket.registro.numero) == 'number') {
            let updateApartados = dateTickets.filter(e=> e.numero != savedTicket.registro.numero);
            updateFindApartados(updateApartados);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Boleto ${savedTicket.registro.numero} guardado correctamente`,
                showConfirmButton: false,
                timer: 2000
            });
            resetSD();
        }
    }, [savedTicket]);

    useEffect(() => {
        if(Object.keys(deletedTicket).length !== 0 && typeof(deletedTicket.registro.numero) == 'number') {
            let updateApartados = dateTickets.filter(e=> e.numero != deletedTicket.registro.numero);
            updateFindApartados(updateApartados);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Boleto ${deletedTicket.registro.numero} Eliminado correctamente`,
                showConfirmButton: false,
                timer: 2000
            });
            resetSD();
        }
    }, [deletedTicket]);

    console.log(dateTickets);

    return (
        <div className="registro-view">

            <hr className="hr-apartado p-2 m-0" />
            <h3 className="text-center text-white">Boletos Apartados</h3>
            <hr className="hr-apartado"/>
            <HandleApartados ticketsApartados={dateTickets} />
        </div>
)}