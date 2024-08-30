import { AdminNav } from "../components/AdminNav"
import { useState } from "react";
import { IsUsuario } from "../components/isUsuario";
import { IsBoletos } from "../components/isBoletos";
import { useLottoStore } from "../../../hooks/useLottoStore";

export const ControlApp = () => {

    const { startResetState } = useLottoStore();

    const [isview, setIsview] = useState(true);

    const viewUsuarios = () => {
        setIsview(true);
        startResetState();
    }
    const viewBoletos = () => {
        setIsview(false);
        startResetState();
    }

    return (
        <>
            <AdminNav/>
            <div className="d-flex justify-content-center pt-3 registro-ops">
                <button className="btn m-1 buscar-usuario" onClick={viewUsuarios}>Buscar Usuarios</button>
                <button className="btn m-1 buscar-boleto" onClick={viewBoletos}>Buscar Boletos</button>
            </div>
            <div className="d-flex justify-content-center registro-ops">
                <button className="btn m-1 set-apartado" onClick={viewUsuarios}>Generar Boleto Apartado</button>
                <button className="btn m-1 t-ganador" onClick={viewUsuarios}><i className="fa-solid fa-crown"></i> Boleto Ganador</button>
                <button className="btn m-1 set-comprado" onClick={viewBoletos}>Generar Boleto Comprado</button>
            </div>
            <hr className="m-0" />
            { (isview) ? <IsUsuario/> : <IsBoletos/> }
        </>
)}