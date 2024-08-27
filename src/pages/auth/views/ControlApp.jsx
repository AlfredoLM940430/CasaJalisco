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
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary m-1" onClick={viewUsuarios}>Usuarios</button>
                <button className="btn btn-primary m-1" onClick={viewBoletos}>Boletos</button>
            </div>
            <hr />
            { (isview) ? <IsUsuario/> : <IsBoletos/> }
        </>
)}