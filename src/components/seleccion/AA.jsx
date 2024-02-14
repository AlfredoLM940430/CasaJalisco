export const NumerosApartados = ({props, deleteN}) => {
    
    return (
        <>
        {
            (props.length > 0) ? (
            <div id="Ap">
                <h6 className="text-center m-0 mt-1">Numeros Seleccionados:</h6>
                <div className="container apartados text-center">
                    {
                        props.map((e) => {
                            const formatoNumero = e.toString().padStart(4, '0');
                            return <li className="btn m-1 col--full" onClick={deleteN} key={formatoNumero}>{formatoNumero}</li>
                        })
                    }
                </div>
                <p className="text-center m-0">Click en el boleto para eliminar</p>
                <button className="btn">Comprar</button>
            </div>)
            : <></>
        }
        </>
)}