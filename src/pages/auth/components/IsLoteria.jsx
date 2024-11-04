import { useEffect, useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { ConfettiApp } from "./ConfettiApp";

export const IsLoteria = () => {

    const { startSavingWinner, startFindGanador, isW, startResetGanador, startGettingWinner } = useAdminStore();
    const [isValid, setIsValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [winerView, setWinerView] = useState(isW);
    const [isConfetti, setIsConfetti] = useState(false);
    const [userWiner, setUserWiner] = useState({});

    useEffect(() => {
        async function fetchData() {
            await startFindGanador();
        }
        fetchData();
    }, []);

    const findBoleto = async(e) => {
        if(e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
        let ticket = e.target.value.replace(/\D/g, '');
        if(Number(ticket) > 60000) {
            Swal.fire({
                icon: "warning",
                text: "Numero fuera de rango",
            });
            setIsValid('');
            return;
        }
        setIsValid(ticket);
    }

    useEffect(() => {
        if(isW) return;
        if(isValid == '') {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [isValid]);

    const onAddWinner = async() => {
        
        const aux = {boleto: isValid.toString().padStart(5, '0')}
        const response = await startSavingWinner(aux);
        
        if(response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                text: response.msg,
                showConfirmButton: false,
                timer: 1500
              });
              setWinerView(true);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                text: response.msg,
                showConfirmButton: false,
                timer: 1500
            });
        }
        setWinerView(true);
        setIsValid('');
    }

    const onWinner = async() => {
        const response = await startGettingWinner();
        // console.log(response.boleto.estado, response.boleto.numero);
        // console.log(response.usuario.nombre, response.usuario.apellido);
        // console.log(response.usuario.estado, response.usuario.telefono);
        if(response.ok) {
            setIsConfetti(response.ok);
            setUserWiner({
                boletoGanador: response.boleto.numero,
                boletoEstado: response.boleto.estado,
                boletoNombre: response.usuario.nombre,
                boletoApellido: response.usuario.apellido,
                boletoTelefono: response.usuario.telefono,
                boletoUbucacion: response.usuario.estado,
            });
        } else {
            setIsConfetti(false);
            setUserWiner({});
        }
    }

    const onWin = () => {
        console.log('Buscando');
    }

    //TODO
    const onReset = async() => {
        //await startResetGanador();
    }

    useEffect(() => {
        setWinerView(isW);
    }, [isW]);

    console.log(winerView.boletoEstado);

    return (
        <>
            {/* { isConfetti ? <ConfettiApp height={document.documentElement.offsetHeight}/> : <></> } */}
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-gold" />
                        {winerView ? <h4 className="text-center title p-2">Buscar ganador</h4> : <h4 className="text-center title p-2">Generar boleto ganador</h4> }
                        <hr className="m-0 hr-gold" />
                    </div>
                </div>

                <div className="n-ticket">
                    <div className="container d-flex justify-content-center">
                        {winerView
                            ? <></>
                            : <input className="form-control" type="tel" placeholder="Boleto" value={isValid} onChange={findBoleto}/>
                        }
                        
                    </div>
                </div>
                <div className="d-flex justify-content-center text-center mt-3 ">
                    {winerView 
                        ? <button className="btn m-2 btn-dark" onClick={onWinner} ><i className="fa-solid fa-crown"></i> Consultar boleto ganador</button>
                        : <button className="btn m-2 t-ganador" onClick={onAddWinner} ><i className="fa-solid fa-crown"></i> Agregar Ganador</button>
                    }
                </div>
                
                {isConfetti
                ? (
                    <div className="info-winner mt-4 mb-2">
                    <p className="mt-2"> <i className="fa-solid fa-ticket"></i> Boleto Ganador: <span className="green">{`${userWiner.boletoGanador.toString().padStart(5, '0')}`}</span></p>
                    <p> <i className="fa-solid fa-ticket"></i> Estado: 
                        <span className={(userWiner.boletoEstado == "comprado") ? "green" : "red"}> {`${userWiner.boletoEstado}`}</span>
                    </p>
                    <hr />
                    <p> <i className="fa-solid fa-user"></i> Nombre: <span className="green">{`${userWiner.boletoNombre} ${userWiner.boletoApellido}`}</span></p>
                    <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span className="green">{`${userWiner.boletoTelefono}`}</span></p>
                    <p className="mb-2"> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span className="green">{`${userWiner.boletoUbucacion}`}</span></p>
                </div>
                )
                : (<></>)
                }

                {/* <div className="info-winner mt-4 mb-2">
                    <p className="mt-2"> <i className="fa-solid fa-ticket"></i> Boleto Ganador: <span>{``}</span></p>
                    <p> <i className="fa-solid fa-ticket"></i> Estado: <span>{``}</span></p>
                    <p> <i className="fa-solid fa-user"></i> Nombre: <span>{``}</span></p>
                    <p> <i className="fa-brands fa-square-whatsapp"></i> Telefono: <span>{``}</span></p>
                    <p className="mb-2"> <i className="fa-solid fa-location-dot"></i> Ubicacion: <span>{``}</span></p>
                </div> */}

                <div className="d-flex mt-5">
                    <button className="btn btn-primary m-auto mt-5 reset-ganador" onClick={onReset}></button>
                </div>
            </div>
        </>
)}