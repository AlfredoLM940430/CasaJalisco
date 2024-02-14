import { CompraModal } from "./CompraModal";

export const NumerosApartados = ({isApartado, setIsApartado}) => {

    const onDelete = (e) => {
        setIsApartado(isApartado.filter(el => el !== Number(e.target.innerHTML)))
    }

    //!!!
    // let serializar = JSON.stringify(isApartado);
    // console.log(serializar);
    // let unpackArr = JSON.parse(serializar);
    // console.log(unpackArr);

    return (
        <>
        {
            (isApartado.length > 0) ? (
            <div id="Ap">
                <h6 className="text-center m-0 mt-1">Numeros Seleccionados:</h6>
                <div className="container apartados text-center">
                    {
                        isApartado.map((e) => {
                            const formatoNumero = e.toString().padStart(4, '0');
                            return <li className="btn m-1 col--full" onClick={onDelete} key={formatoNumero}>{formatoNumero}</li>
                        })
                    }
                </div>
                <p className="text-center m-0">Click en el boleto para eliminar</p>
                <CompraModal isApartado={isApartado}/>
                {/* <button id="comprar" className="btn">Comprar</button> */}
            </div>)
            : <></>
        }
        </>
)}