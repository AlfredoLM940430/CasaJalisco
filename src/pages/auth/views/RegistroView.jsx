import { useState } from "react";
import { AdminNav } from "../components/AdminNav"
import { IsApartado } from "../components/IsApartado";

const comprado = "#4225ff";

export const RegistroView = () => {

    const [isview, setIsview] = useState(true);

    const viewApartados = () => {
        setIsview(true);
    }
    const viewComprados = () => {
        setIsview(false);
    }
    
    return (
        <>
            <AdminNav/>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary m-1" onClick={viewApartados}>Ver Apartados</button>
                <button className="btn btn-primary m-1" onClick={viewComprados}>Ver Comprados</button>
            </div>

            {
                isview
                ?<IsApartado/>
                :(
                    <>
                    <h3 className="text-center m-2">Usuarios con boletos Comprados:</h3>
                    <div className="container-info text-center">
                        <div className="m-1 user-apartado" style={{backgroundColor: comprado, color: "white"}}>
                            <h6>José Alfredo López Mares</h6>
                            <p>3311486142</p>
                            <button>
                                <p>50 numeros <i className="fa-solid fa-clipboard-question"></i></p>
                            </button>
                            <p>[FECHA]</p>
                        </div>
                    </div>
                    </>
                )
            }
        </>
)}