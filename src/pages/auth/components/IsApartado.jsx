import { useEffect, useState } from "react";
import { BuscarUsuario } from "./BuscarUsuario";
import { useLottoStore } from "../../../hooks/useLottoStore";

export const IsApartado = () => {

    const { startFindApartados, apartados } = useLottoStore();
    const [dateTickets, setDateTickets] = useState([]);
    
    useEffect(() => {
        if(apartados.length > 0) return;
        async function fetchData() {
            let response = await startFindApartados();
            console.log(response);
        }
        fetchData();
    }, []);  

    useEffect(() => {
        if(Object.keys(apartados).length > 0) {
            let tickets = [...apartados];
            setDateTickets(sortByDate(tickets));
        }
    }, [apartados]);
    
    const sortByDate = (data) => data.sort(({fecha: a}, {fecha: b}) => a < b ? -1 : a > b ? 1 : 0); 

    const isCompra = (e) => {
        e.preventDefault();
        let aux = JSON.parse(e.target.parentElement.id);
        console.log(aux);
        Swal.fire({
            title: `Confirmar compra?`,
            html: `Usuario: ${aux.usuario} <br><br> Boleto: [${aux.numero.toString().padStart(5, '0')}]`,
            showCancelButton: true,
            confirmButtonText: "Confirmar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Compra confirmada", "", "success");
            } else if (result.isDenied) {
                Swal.fire("No confirmaste!", "", "info");
            }
        });
    }

    const isDel = (e) => {
        e.preventDefault();
        let aux = JSON.parse(e.target.parentElement.id)
        Swal.fire({
            title: "Eliminar boletos apartados?",
            html: `Usuario: ${aux.usuario} <br><br> Boleto: [${aux.numero.toString().padStart(5, '0')}]`,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#ff0000",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Compra confirmada", "", "success");
            } else if (result.isDenied) {
                Swal.fire("No fue confirmada", "", "info");
            }
        });
    }

    const fechaActual = new Date();
    const apartado1 = "rgb(63,179,251)";
    const apartado2 = "radial-gradient(circle, rgba(63,179,251,1) 0%, rgba(65,182,251,1) 12%, rgba(70,252,221,1) 100%)";
    const vencido1 = "rgb(251,251,63)";
    const vencido2 = "radial-gradient(circle, rgba(251,251,63,1) 0%, rgba(236,251,65,1) 12%, rgba(252,197,70,1) 100%)";
    let color = "#00cc83";
    let colorVencido = "#f7b63d";

    return (
        <div className="registro-view">

            {/* <BuscarUsuario/> */}

            <hr className="hr-apartado p-2 m-0" />
            <h3 className="text-center text-white">Boletos Apartados</h3>
            <hr className="hr-apartado"/>
            <div className="container-info text-center">
                {
                    dateTickets.map((e, i) => {
                        const fecha = new Date(e.fecha);
                        const formato = e.numero.toString().padStart(5, '0');
                        fecha.setHours(fecha.getHours()+12);
                        if(fechaActual < fecha){
                            return (
                                <div className="m-1 user-apartado" key={i} style={{background: apartado1, background: apartado2}}>
                                    <h6>{e.usuario}</h6>
                                    <p>{e.telefono}</p>
                                    <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                                    <p>{new Date(e.fecha).toLocaleDateString()}</p>
                                    <div className="d-flex justify-content-between">
                                        <button id={JSON.stringify(e)} onClick={isCompra}><i className="fa-solid fa-square-check"></i></button>
                                    </div>
                                </div>
                           )
                        } else {
                            return (
                                <div className="m-1 user-apartado" key={i} style={{background: vencido1, background: vencido2}}>
                                    <h6>{e.usuario}</h6>
                                    <p>{e.telefono}</p>
                                    <p>{formato} <i className="fa-solid fa-ticket"></i></p>
                                    <p>{new Date(e.fecha).toLocaleDateString()}</p>
                                    <div className="d-flex justify-content-between">
                                        <button id={JSON.stringify(e)} onClick={isCompra}><i className="fa-solid fa-square-check"></i></button>
                                        <button id={JSON.stringify(e)} onClick={isDel}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                           )
                        }
                    })
                }
            </div>
        </div>
)}