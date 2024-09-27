import { useEffect, useState } from "react";
import { AdminNav } from "../components/AdminNav"
import { IsApartado } from "../components/IsApartado";
import { IsComprado } from "../components/IsComprado";
import { useAdminStore } from "../../../hooks/useAdminStore";


export const RegistrosApp = () => {

    const { apartados, comprados, startFindApartados, startFindComprados } = useAdminStore();
    const [isview, setIsview] = useState(true);
    const [callComprados, setCallComprados] = useState(false);

    useEffect(() => {
        if(apartados.length > 0) return;
        async function fetchData() {
            let response = await startFindApartados();
        }
        fetchData();
    }, []);

    const viewApartados = () => {
        setIsview(true);
    }
    const viewComprados = async() => {
        setIsview(false);
        setCallComprados(true);         
        if((comprados.length > 0) || (callComprados)) return;
        let response = await startFindComprados();
    }

    const updateView = async() => {
        let apartados = await startFindApartados();
        let comprados = await startFindComprados();
        console.log(apartados.ok);
    }
    
    return (
        <>
            <AdminNav/>
            <div className="d-flex justify-content-center pt-3 pb-2 registro-ops">
                <button className="btn ops-apartado m-1" onClick={viewApartados}>Apartados</button>
                <button className="btn btn-secondary m-1" onClick={updateView} ><i className="fa-solid fa-repeat m-0 p-0"></i> Actualizar</button>
                <button className="btn ops-comprado m-1" onClick={viewComprados}>Comprados</button>
            </div>
            { (isview) ? <IsApartado/> : <IsComprado/> }
        </>
)}