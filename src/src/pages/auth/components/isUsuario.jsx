import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { HandleApartados } from "./HandleApartados";
import { HandleComprados } from "./HandleComprados";

export const IsUsuario = () => {

    const { startFindUserById, savedTicket, startUpdateUserById, deletedTicket, usuarioId, resetSD, } = useAdminStore();
    const { startLogout } = useAuthStore();
    const [isValid, setIsValid] = useState('');

    console.log(savedTicket);
    
    const findCel = async(e) => {
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
        if(number.length === 10) {
            e.target.blur();
            let form = {telefono: number}
            let response = await startFindUserById(form);
            if(response.ok !== true) {
                if(response.ok == false) {
                    Swal.fire({
                        icon: "warning",
                        title: "Error",
                        text: response.msg,
                    });
                    setIsValid('');
                    return;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.response.data.msg,
                    }).then(() => {
                        startLogout();
                    });
                }
            }
            setIsValid('');
        }
    }

    if(Object.keys(usuarioId).length > 0) {
        let updateComprados = [...usuarioId.comprados];
        updateComprados.push(savedTicket.registro);
    }
    
    useEffect(() => {
        if((Object.keys(savedTicket).length !== 0 && typeof(savedTicket.registro.numero) == 'number') && (Object.keys(usuarioId).length !== 0)) {
            let updateApartados = usuarioId.apartados.filter(e=> e.numero != savedTicket.registro.numero);
            let updateComprados = [...usuarioId.comprados];
            updateComprados.push(savedTicket.registro);
            let aux = {
                ok: "true",
                usuario: usuarioId.usuario,
                apartados: updateApartados,
                comprados: updateComprados,
            }
            startUpdateUserById(aux);
            resetSD();
        }
    }, [savedTicket]);

    useEffect(() => {
        if(Object.keys(deletedTicket).length !== 0 && typeof(deletedTicket.registro.numero) == 'number') {
            let updateApartados = usuarioId.apartados.filter(e=> e.numero != deletedTicket.registro.numero);
            let updateComprados = [...usuarioId.comprados];
            let aux = {
                ok: "true",
                usuario: usuarioId.usuario,
                apartados: updateApartados,
                comprados: updateComprados,
            }
            startUpdateUserById(aux);
            resetSD();
        }        
    }, [deletedTicket]);

    const aux = (Object.keys(usuarioId).length > 0) ? usuarioId : '';
    useEffect(() => {
        if(aux !== '') window.scroll({top: 300, behavior: "smooth"});
    }, [usuarioId]);    

    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-aqua" />
                        <h4 className="text-center title p-2">Buscar usuario</h4> 
                        <hr className="m-0 hr-aqua" />
                    </div>
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Telefono" value={isValid} onChange={findCel}/>
                    </div>
                </div>
                {(Object.keys(usuarioId).length > 2) ? 
                (<div className="isTrue p-5 text-white">
                    <div className="info-card-admin">
                        <p className="pt-2"> <i className="fa-solid fa-user"></i> Nombre: <span>{usuarioId.usuario.nombre} {usuarioId.usuario.apellido}</span></p>
                        <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span>{usuarioId.usuario.telefono}</span></p>
                        <p> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span>{usuarioId.usuario.estado}</span></p>
                        <p> <i className="fa-solid fa-ticket"></i> Apartados: <span>{Object.keys(usuarioId.apartados).length}</span></p>
                        <p className="pb-2"> <i className="fa-solid fa-ticket"></i> Comprados: <span>{Object.keys(usuarioId.comprados).length}</span></p>
                    </div>
                    <hr />
                    <HandleApartados ticketsApartados={usuarioId.apartados} />
                    <hr />
                    <HandleComprados telefono={usuarioId.usuario.telefono} ticketsComprados={usuarioId.comprados} />
                </div>): (<></>)}
            </div>
        </>
)}