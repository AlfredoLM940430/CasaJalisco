import { useEffect, useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const IsLoteria = () => {

    const { startSavingWinner, startFindGanador, isW, startResetGanador } = useAdminStore();
    const [isValid, setIsValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let response = await startFindGanador();
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

    const onWinner = async() => {
        const aux = {
            boleto: isValid.toString().padStart(5, '0'),
        }
        const response = await startSavingWinner(aux);
        if(response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                text: response.msg,
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                text: response.msg,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    //TODO
    const onReset = async() => {
        await startResetGanador();
    }

    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-gold" />
                        <h4 className="text-center title p-2">Generar boleto ganador</h4> 
                        <hr className="m-0 hr-gold" />
                    </div>
                </div>
                <div className="n-ticket">
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Boleto" value={isValid} onChange={findBoleto}/>
                    </div>
                </div>
                <div className="d-flex text-center mt-3">
                    <button className="btn m-auto t-ganador" disabled={isDisabled} onClick={onWinner} ><i className="fa-solid fa-crown"></i> Agregar Ganador</button>
                </div>
                <div className="d-flex mt-5">
                    {(isW) ? <button className="m-auto mt-5 reset-ganador" disabled={onReset}>X</button> : <></>}
                </div>
            </div>
        </>
)}