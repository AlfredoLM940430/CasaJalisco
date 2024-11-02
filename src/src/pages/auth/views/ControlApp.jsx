import { AdminNav } from "../components/AdminNav"
import { useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { SetControlView } from "../components/setControlView";

export const ControlApp = () => {

    const { startResetState } = useAdminStore();

    const [isview, setIsview] = useState('usuarios');

    const viewUsuarios = () => {
        setIsview('usuarios');
        startResetState();
    }
    const viewBoletos = () => {
        setIsview('boletos');
        startResetState();
    }
    const generarApartado = () => {
        setIsview('apartar');
        startResetState();
    }
    // const generarComprado = () => {
    //     setIsview('comprar');
    //     startResetState();
    // }
    const viewGanador = () => {
        setIsview('loteria');
        startResetState();
    }
    
    return (
        <>
            <AdminNav/>
            <div className="d-flex justify-content-center pt-3 registro-ops">
                <button className="btn m-1 buscar-usuario" onClick={viewUsuarios}>Buscar Usuario</button>
                <button className="btn m-1 buscar-boleto" onClick={viewBoletos}>Buscar Boletos</button>
            </div>
            <div className="d-flex justify-content-center registro-ops">
                <button className="btn m-1 set-apartado" onClick={generarApartado}>Apartar <i className="fa-solid fa-ticket"></i></button>
                {/* <button className="btn m-1 set-comprado" onClick={generarComprado}>Comprar <i className="fa-solid fa-ticket"></i></button> */}
            </div>
            <div className="d-flex justify-content-center registro-ops">
                <button className="btn m-1 t-ganador" onClick={viewGanador}><i className="fa-solid fa-crown"></i></button>
            </div>
            <SetControlView isView={isview} />
        </>
)}