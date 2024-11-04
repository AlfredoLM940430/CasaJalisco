import { useEffect, useState } from "react";
import { useLottoStore } from "../../hooks/useLottoStore";
import { NoComprados } from "./components/NoComprados";
import { ConfettiApp } from "../auth/components/ConfettiApp";
import { ViewGanador } from "./components/ViewGanador";
import { ViewBoletos } from "./components/ViewBoletos";

export const MiBoleto = () => {

    // API
    const { startFindBoletos, boletos_usuarios } = useLottoStore();
    const [isValid, setIsValid] = useState('');
    const [winner, setWinner] = useState(false);
    const [isConfetti, setIsConfetti] = useState(false);
    
    const findCel = async(e) => {
        //setIsboleto(false);
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        //let number = e.target.value;
        setIsValid(number);
        if(number.length === 10) {
            e.target.blur();
            let form = {telefono: number}
            let response = await startFindBoletos(form);
            if(response.ok === false) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: response.msg,
                });
            }
            setIsValid('');
        }
    }    
    const aux = (Object.keys(boletos_usuarios).length > 0) ? boletos_usuarios : '';

    useEffect(() => {
        
        if(aux.ganador) {
            console.log(`Muchas felicidades ${aux.usuario.nombre}<i class="fa-solid fa-star" style="color: #FFD43B;"></i>, tienes el numero ganador!!!`);
            
            setIsConfetti(aux.ganador);
            Swal.fire({
                title: `Muchas Felicidades ${aux.usuario.nombre}!!!`,
                html: `
                    <div>
                        <p>Tu tienes el numero ganador: <i class="fa-solid fa-clover"></i> ${aux.gdtkt} <i class="fa-solid fa-clover"></i></p>
                        <br/>
                        <p>Pronto nos pondremos en contacto contigo.</p>
                    </div>
                `,
                width: 600,
                padding: "3em",
                color: "#716add",
                //background: "#fff url(/images/trees.png)",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/public/img/nyan-cat.gif")
                  left top
                  no-repeat
                `
              });
        } else {
            setIsConfetti(false);
        }
            
        //console.log(aux);
        if(aux !== '') {
            window.scroll({top: 300, behavior: "smooth"});
            if(aux.ganador) {
                setWinner(true);
            } else {
                setWinner(false);
            }
        }
    }, [boletos_usuarios]);    

    return (
        <>
            <header>
                <div id="Boletos" className="d-flex justify-content-center">
                    <div className="align-self-center">
                        <h5 className="text-center p-4">
                            <i className="fa-solid fa-clover"/> Mi Boleto <i className="fa-solid fa-clover"/>
                        </h5>
                    </div>
                </div>
            </header>

            <div className="n-ticket">
                <h4 className="text-center title m-4">Ingresa tu Celular</h4> 
                <div className="container d-flex justify-content-center">
                    <input className="form-control" type="tel" value={isValid} onChange={findCel}/>
                </div>
            </div>
            <div className="mt-1 p-0 boleto-dudas text-center">
                <a target="_blank" rel="noopener" href={"https://wa.me/+523311486142"}><i className="fa-brands fa-whatsapp"></i></a>
                <p>Tienes alguna duda?</p>
            </div>
            <hr id="info"/>
            { isConfetti ? <ConfettiApp height={document.body.offsetHeight} /> : <></> }
            <ViewBoletos aux={aux} />
            {/* { isConfetti ? <ViewGanador aux={aux}/> : <ViewBoletos aux={aux} /> } */}
        </>
)}