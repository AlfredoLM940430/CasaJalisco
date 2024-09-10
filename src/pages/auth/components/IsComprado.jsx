import { useEffect } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const IsComprado = () => {

    const { comprados, startFindComprados } = useAdminStore();

    useEffect(() => {
        if(comprados.length > 0) return;
        async function fetchData() {
            let response = await startFindComprados();
            console.log(response);
        }
        fetchData();
    }, []);    

    return (
        <div className="registro-view">

            <hr className="hr-compra p-2 m-0" />
            <h3 className="text-center text-white">Boletos Comprados</h3>
            <hr className="hr-compra" />

            <div className="container-info text-center">
                {
                    comprados.map((e, i) => {
                        const formato = e.numero.toString().padStart(5, '0');
                        return (
                            <div className="m-1 ticket-apartado user-comprado" key={i}>
                                <h6>{e.usuario}</h6>
                                <p>{e.telefono}</p>
                                <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
)}