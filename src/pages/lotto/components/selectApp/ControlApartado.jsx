import { useEffect, useState } from "react";
import { RandomApp } from "./";

export const ControlApartado = ({boletos, isApartado, setIsApartado, isNumero, setIsNumero}) => {
    
    const [isset, setIsset] = useState(0);

    useEffect(() => {
        if(isNumero === '') {
            setIsset(0);
            return;
        } 
        setIsset(boletos.find(el => el.numero === Number(isNumero)))
    }, [isNumero]);

    const apartarNumero = (e) => {
        e.preventDefault();
        const numero = e.target.textContent.match(/\d/g);
        localStorage.setItem('numero', Number(numero.join("")));
        setIsApartado(isApartado => [...isApartado, Number(localStorage.getItem('numero'))]);
        setIsNumero('');
    }

    if(isset) {
        const formato = isNumero.toString().padStart(5, '0');
        if(isApartado.includes(isset.numero)) {
            return <p className="text-center ya-no-disponible">Ya Tienes Apartado Este Numero</p>
        }
        return (
            <div className="numero-disponible">
                <p className="text-center numero-disponible">
                <i className="fa-solid fa-check"></i> Numero Disponible</p>
                <button className="btn btn-primary" onClick={apartarNumero}>Apartar Numero: [{formato}]</button>
            </div>
        )
    }

    if(isNumero === '') {
        return (
            (boletos.length - isApartado.length <= 3 || isApartado.length >= 50)
            ? <></>
            : <RandomApp boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado} />
        );
        //return <BoostrapModal boletos={boletos} boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado} />;
    }
    
    return (
        <p className="text-center numero-no-disponible">
            <i className="fa-solid fa-xmark"></i> Numero No Disponible <i className="fa-solid fa-xmark"></i>
        </p>
    )
}