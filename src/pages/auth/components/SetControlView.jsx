import { useEffect, useState } from "react";
import { IsUsuario } from "./isUsuario";
import { IsBoletos } from "./IsBoletos";
import { AdminApartados } from "./AdminApartados";
import { AdminComprados } from "./AdminComprados";
import { IsLoteria } from "./isLoteria";

export const SetControlView = ({isView}) => {

    switch (isView) {
        case 'usuarios':
            return <IsUsuario/>;
        case 'boletos':
            return <IsBoletos/>;
        case 'apartar':
            return <AdminApartados/>;
        case 'comprar':
            return <AdminComprados/>;
        case 'loteria':
            return <IsLoteria/>;
        default:
            break;
    }
}