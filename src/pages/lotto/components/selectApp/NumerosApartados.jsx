import { CompraModal } from "./CompraModal";

export const NumerosApartados = ({isApartado, setIsApartado}) => {

    const onDelete = (e) => {
        setIsApartado(isApartado.filter(el => el !== Number(e.target.innerHTML)))
    }

    const cerrarSelec = () => {
        Swal.fire({
            title: "¿Eliminar Boletos?",
            text: "Se perderan todos los boletos apartados!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsApartado([]);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Numeros eliminados!",
                    showConfirmButton: false,
                    timer: 700
                });
            }
        });
    }

    return (
        <>
        {
            (isApartado.length > 0) ? (     
            <div id="Ap">
                <div className="xmark" onClick={cerrarSelec}>
                    <i className="fa-solid fa-square-xmark"></i>
                </div>
                <h6 className="text-center m-0 ml-5">Numeros Seleccionados:</h6>
                <div className="container apartados text-center">
                    {
                        isApartado.map((e) => {
                            const formatoNumero = e.toString().padStart(5, '0');
                            return <li className="btn m-1 col--full" onClick={onDelete} key={formatoNumero}>{formatoNumero}</li>
                        })
                    }
                </div>
                <p className="click-toD text-center m-0">Click en el boleto para eliminar</p>
                <CompraModal isApartado={isApartado} setIsApartado={setIsApartado}/>
            </div>)
            : <></>
        }
        </>
)}