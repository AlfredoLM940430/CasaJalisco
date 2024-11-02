import { useEffect, useState } from "react"
import { NumerosApartados, ControlApartado } from "./";
import ReactVirtuoso from "./ReactVirtuoso";
import { useLottoStore } from "../../../../hooks/useLottoStore";

export const SelectionApp = () => {

    // API
    const { boletos, startLoadingBoletos, startLoadingUsers, isLoadingEvents } = useLottoStore();
    
    useEffect(() => {
        startLoadingBoletos();
        startLoadingUsers();
    }, []);
    
    const [isApartado, setIsApartado] = useState([]);
    const [isNumero, setIsNumero] = useState('');
    const [formato, setFormato] = useState("Buscando");

    const handleChange = (e) => {
        if(e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
        let number = e.target.value.replace(/\D/g, '');
        setIsNumero(number);
    }

    useEffect(() => {
        
        setFormato(`Buscando...`);
        if((boletos.length - isApartado.length) === 0) {
            setFormato(`Numeros agotados`);
            return;
        }
        setTimeout(() => {
            if(boletos.length > 0) {
                let numero = (Math.floor(Math.random() * (boletos.length - 1 + 1) + 1)) - 1;
                while(isApartado.includes(boletos[numero].numero)) {
                    numero = (Math.floor(Math.random() * (boletos.length - 1 + 1) + 1)) - 1;
                }
                setFormato(`¿${boletos[numero].numero}?`);
                return;
            }
        }, 500);
    }, [boletos, isApartado]);
 
    return (
        <>
            <div id="BoletosId">
                <div className="boletos d-flex justify-content-center">
                    <div className="align-self-center">
                        <p className="text-center container">Encuentra aqui abajo tu numero de la suerte!<i className="fa-solid fa-clover"></i></p>
                    </div>
                </div>
                {<NumerosApartados isApartado={isApartado} setIsApartado={setIsApartado}/>}
                <p className="mt-4">Busca tu Numero</p>
                <div className="mb-4">
                    <input className="form-control" type="tel" value={isNumero} onChange={handleChange} placeholder={formato}/>
                </div>
                {<ControlApartado boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado} isNumero={isNumero} setIsNumero={setIsNumero}/>}
                <h5 className="text-center mb-0">Numeros Disponibles</h5>
                <p className="text-center p-0 m-0 click-to">*Click para seleccionar*</p>     
                <div className="d-flex justify-content-center mb-5">
                    <div className="" id="global">
                        <div className="grid-it" id="mensajes">
                            <ReactVirtuoso isLoadingEvents={isLoadingEvents} boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
)}