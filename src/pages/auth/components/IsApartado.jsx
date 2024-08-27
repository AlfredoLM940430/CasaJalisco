import { useEffect, useState } from "react";
import { BuscarUsuario } from "./BuscarUsuario";
import { useLottoStore } from "../../../hooks/useLottoStore";

export const IsApartado = () => {

    const { startFindApartados, apartados } = useLottoStore();

    console.log(apartados.length);
    
    useEffect(() => {
        if(apartados.length > 0) return;
        async function fetchData() {
            let response = await startFindApartados();
            console.log(response);
        }
        fetchData();
    }, []);   

    const res = {
        "ok": true,
        "aux": [
            {
                "usuario": "José Alberto Lopez Mares",
                "telefono": "3311486141",
                "numero": 11,
                "fecha": "2024-06-16T20:56:58.662Z"
            },
            {
                "usuario": "José Alfredo Lopez Mares",
                "telefono": "3311486144",
                "numero": 17,
                "fecha": "2024-03-12T21:06:10.005Z"
            },
            {
                "usuario": "Alfredo Lopez Mares",
                "telefono": "3311486141",
                "numero": 62,
                "fecha": "2024-06-15T20:58:59.984Z"
            }
        ]
    }

    const fechaActual = new Date();
    let color = "#00ff95";

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

    return (
        <div className="registro-view">

            {/* <BuscarUsuario/> */}

            <h3 className="text-center m-2">Registro: Boletos Apartados</h3>
            <div className="container-info text-center">
                {
                    apartados.map((e, i) => {
                    //res.aux.map((e, i) => {
                        const fecha = new Date(e.fecha);
                        const formato = e.numero.toString().padStart(5, '0');
                        fecha.setHours(fecha.getHours()+10);
                        if(fechaActual < fecha){
                            return (
                                <div className="m-1 user-apartado" key={i} style={{backgroundColor: color}}>
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
                            color = "#f7b63d";
                            return (
                                <div className="m-1 user-apartado" key={i} style={{backgroundColor: color}}>
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