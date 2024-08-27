import { SelectionApp } from "./components/";

export const BoletajePage = () => {
    return (
        <>
            <header>
                <div id="Boletos" className="d-flex justify-content-center">
                    <div className="align-self-center">
                        <h5 className="text-center p-4">GRAN SORTEO REGIONAL</h5>
                        <h6 className="text-center pb-4">$150,000<span>MXN</span></h6>
                        <p className="text-center mb-0">Proximas Fechas:</p>
                        {/* <p className="text-center titlee">09 de Enero 2025 </p> */}
                        <p className="text-center">** Hasta agotar existencias **</p>
                    </div>
                </div>
            </header>

            <div className="precios d-flex">
                <div className="container d-flex justify-content-center">
                    <div className="text-center">
                        <p>1 Boleto por -&#62; $10</p>
                        <p>+5 Boletos por -&#62; $7</p>
                        <p>+10 Boletos por -&#62; $5</p>
                    </div>
                </div>
            </div>
            <SelectionApp/>
        </>
)}