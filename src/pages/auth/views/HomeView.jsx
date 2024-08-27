import { Footer } from "../../../components/Footer"
import { AdminNav } from "../components/AdminNav"

export const HomeView = () => {
    return (
        <>
            <AdminNav/>
            <main className="home">
                <div className="container">
                    
                    <div className="row">
                        <div className="col p-5 users"> 
                            <h3>Ultimo Registro</h3>
                            <p>[3311486142: 4 Boletos]</p>
                        </div>
                        <div className="col p-5 disponibles">
                            <h3>Numeros Libres</h3>
                            <p>2553 Boletos</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col p-5 ingresos"> 
                            <h3 className="mt-2">Ingresos</h3>
                            <p>$: 560</p>
                        </div>
                        <div className="col p-5 participantes">
                        <h3 className="mt-2">Usuarios</h3>
                            <p>56</p>
                        </div>
                    </div>
                </div>
            </main>           
        </>
)}