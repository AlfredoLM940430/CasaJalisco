import { useState } from "react"
import { NumerosApartados } from "./NumerosApartados";
import { BoletosApp } from "./BoletosApp";
import { ControlApartado } from "./ControlApartado";
import { ControlBoletos } from "./ControlBoletos";

export const SelectionApp = () => {

    const [isApartado, setIsApartado] = useState([]);
    
    const {APIBoletos} = BoletosApp();
    const [boletos, setBoletos] = useState(APIBoletos);

    const [isNumero, setIsNumero] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value.length);
        if(e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5);
        let number = e.target.value.replace(/\D/g, '');
        setIsNumero(number);
    }

    // console.log(isApartado);

    return (
        <>
        <div id="BoletosId">
            <div className="boletos d-flex justify-content-center">
                <div className="align-self-center">
                    <p className="text-center container">Encuentra aqui abajo tu numero de la suerte!<i className="fa-solid fa-clover"></i></p>
                </div>
            </div>
            {<NumerosApartados isApartado={isApartado} setIsApartado={setIsApartado}/>}
            <div className="mt-4 mb-4">
                <input className="form-control" value={isNumero} placeholder="Busca Tu Numero" onChange={handleChange} />
            </div>
            {<ControlApartado boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado} isNumero={isNumero} setIsNumero={setIsNumero}/>}
            <h5 className="text-center mb-0">Numeros Disponibles</h5>
        </div>
        <p className="text-center p-0 m-0 click-to">*Click para seleccionar*</p>     

        <div className="d-flex justify-content-center mb-5">
                <div className="" id="global">
                    <div className="grid-it" id="mensajes">
                        {<ControlBoletos boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado}/>}
                    </div>
                </div>
            </div>
        </>
)}