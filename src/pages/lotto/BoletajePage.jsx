import { Footer } from "../../components/Footer"
import { NavBar } from "../../components/NavBar"
import { SelectionApp } from "../../components/selectApp/SelectionApp"

export const BoletajePage = () => {
    return (
        <>
            <header>
                <NavBar/>
                <div id="Boletos" className="d-flex justify-content-center">
                    <div className="align-self-center">
                        <h5 className="text-center p-4">GRAN SORTEO REGIONAL</h5>
                        <h6 className="text-center pb-4">$50,000<span>MXN</span></h6>
                        <p className="text-center mb-0">Proximas Fechas:</p>
                        {/* <p className="text-center titlee">09 de Enero 2025 </p> */}
                        <p className="text-center">** Hasta agotar existencias **</p>
                    </div>
                </div>
            </header>

            <div className="precios d-flex">
                <div className="container d-flex justify-content-center">
                    <div className="text-center">
                        <p>1 Boleto por -&#62; $5</p>
                        <p>3 Boletos por -&#62; $10</p>
                        <p>10 Boletos por -&#62; $25</p>
                    </div>
                </div>
            </div>

            {/* <div id="premio" className="p-5 d-flex justify-content-center">
                <div className="align-self-center">
                    <div className="">
                        <h5 className="text-center">Con tu boleto liquidado participas por:​</h5>
                        <h6 className="text-center">$50,000 <span>Pesos</span>​</h6>
                    </div>
                    <hr></hr>
                    <p className="text-center">Encuentra transmisión en vivo de los sorteos en nuestra página de Facebook en las fechas indicadas a las 20:00 hrs CDMX. ¡No te lo pierdas!</p>
                </div>
            </div> */}

            <SelectionApp/>
            <Footer/>
        </>
)}