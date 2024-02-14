import { BoostrapModal } from "./BoostrapModal";
import { ControlModal } from "./ControlModal";

export const ControlApartado = ({boletos, isApartado, setIsApartado, isNumero, setIsNumero}) => {

    const apartarNumero = (e) => {
        e.preventDefault();
        const numero = e.target.textContent.match(/\d/g);
        localStorage.setItem('numero', Number(numero.join("")));
        setIsApartado(isApartado => [...isApartado, Number(localStorage.getItem('numero'))]);
        setIsNumero('');
    }

    if(boletos.includes(Number(isNumero))) {
        const formato = isNumero.toString().padStart(4, '0');
        if (isApartado.includes(Number(isNumero))) {
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
        return <BoostrapModal boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado} />;
        // return <ControlModal boletos={boletos} isApartado={isApartado} setIsApartado={setIsApartado}/>;
    }
    
    return (
        <p className="text-center numero-no-disponible">
            <i className="fa-solid fa-xmark"></i> Numero No Disponible <i className="fa-solid fa-xmark"></i>
        </p>
    )
}