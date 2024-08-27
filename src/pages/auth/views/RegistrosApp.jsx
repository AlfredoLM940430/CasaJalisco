import { useState } from "react";
import { AdminNav } from "../components/AdminNav"
import { IsApartado } from "../components/IsApartado";
import { IsComprado } from "../components/isComprado";


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
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary m-1" onClick={viewApartados}>Apartados</button>
                <button className="btn btn-dark" onClick={updateView} ><i className="fa-solid fa-repeat m-0 p-0"></i></button>
                <button className="btn btn-primary m-1" onClick={viewComprados}>Comprados</button>
            </div>
            { (isview) ? <IsApartado/> : <IsComprado/> }
        </>
)}