import { useEffect, useState } from "react";
import { useLottoStore } from "../../../hooks/useLottoStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const IsUsuario = () => {

    const { startFindUserById, usuarioId } = useLottoStore();
    const { startLogout } = useAuthStore();
    const [isValid, setIsValid] = useState('');
    const [data, setData] = useState({})
    const navigate = useNavigate();
    
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
            setData(response);
            setIsValid('');
        }
    }

    const aux = (Object.keys(usuarioId).length > 0) ? usuarioId : '';

    useEffect(() => {
        if(aux !== '') {
            window.scroll({top: 300, behavior: "smooth"})
        }
    }, [usuarioId]);

    console.log(usuarioId);

    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <h4 className="text-center title m-4">Buscar usuario</h4> 
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Telefono" value={isValid} onChange={findCel}/>
                    </div>
                </div>
                { (Object.keys(usuarioId).length > 2)
                 ?  (
                        <>
                            <div className="container mt-5">
                                <h2 className="text-center">Info:</h2>
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Apellido</th>
                                            <th scope="col">Ubicación</th>
                                            <th scope="col">Telefono</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{usuarioId.usuario.nombre}</td>
                                            <td>{usuarioId.usuario.apellido}</td>
                                            <td>{usuarioId.usuario.estado}</td>
                                            <td>{usuarioId.usuario.telefono}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h2 className="text-center">Boletos:</h2>
                            </div>
                        </>
                    )
                 :  (
                        <></>
                    )


                }
            </div>
        </>
)}