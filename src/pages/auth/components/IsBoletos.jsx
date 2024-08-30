import { useEffect, useState } from "react";
import { useLottoStore } from "../../../hooks/useLottoStore";

export const IsBoletos = () => {

    const { startFindByTicked, ticketsID } = useLottoStore();
    const [isValid, setIsValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    
    const findBoleto = async(e) => {

        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
    }

    const startFindUser = async () => {
        let ticket = {boleto: isValid}
        let response = await startFindByTicked(ticket);
        if(response.ok === false) {
            Swal.fire({
                icon: "warning",
                //title: "Atencion!!",
                text: response.msg,
            });
        }
        setIsValid('');
        setIsDisabled(true)
    }

    useEffect(() => {
        if(isValid == '') {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [isValid]);

    console.log(ticketsID);
    
    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <h4 className="text-center title p-4">Buscar boleto</h4> 
                    <div className="container d-flex justify-content-center">
                        <input className="form-control" type="tel" placeholder="Boleto" value={isValid} onChange={findBoleto}/>
                    </div>
                    <div className="d-flex text-center mt-3">
                        <button className="m-auto btn btn-dark" disabled={isDisabled} onClick={startFindUser}>Buscar Boleto</button>
                    </div>
                </div>
            </div>
        </>
)}