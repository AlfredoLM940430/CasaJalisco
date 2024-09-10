import { useState } from "react";
import { AdminNav } from "../components/AdminNav"
import { IsApartado } from "../components/IsApartado";
import { IsComprado } from "../components/IsComprado";


export const RegistrosApp = () => {

    const [isview, setIsview] = useState(true);

    const viewApartados = () => {
        setIsview(true);
    }
    const viewComprados = () => {
        setIsview(false);
    }

    const updateView = () => {
        if(isview) {
            console.log('actualizando apartados');
        } else {
            console.log('actualizando comprados');
        }
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