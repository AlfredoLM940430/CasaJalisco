import { useEffect, useState } from "react";
import Select from 'react-select'


export const BoostrapModal = ({boletos, isApartado, setIsApartado}) => {
    
    let aux = boletos.filter(val => !isApartado.includes(val));

    if((aux.length < 10 || isApartado.length >= 35)) {
        return;
    }

    const options = [
        { value: 1, label: "1 Numero" },
        { value: 3, label: "3 Numeros" },
        { value: 10, label: "10 Numeros" },
    ];

    const [israndom, setIsrandom] = useState([]);
    const [selected, setSelected] = useState(null);
    const [value, setValue] = useState(null);

    const handleChange = (selectedOption) => {
      setSelected(selectedOption.value);
      setValue(selectedOption)
    };

    useEffect(() => {
        if (aux.length < selected) {
            setSelected(aux.length);
        }
    }, [selected])
    
    const generarRandom = () => {
        if (aux.length < selected) return;
        
        let baux = [];
        let GN = 0;
        for (let i = 0; i < selected; i++) {
            GN = aux[Math.floor(Math.random()*aux.length)];
            if(baux.includes(GN)) {
                i--;
                baux = baux;
            } else {
                baux = [...baux, GN];
            }
        }
        setIsrandom(baux);
    }

    const selectRandom = () => {
        israndom.forEach((ticket) => {
            setIsApartado(isApartado => [...isApartado, ticket]);
        });
        setIsrandom([]);
        setSelected(null);
        setValue(null);
    }
    
    const clearRandom = () => {
        setIsrandom([]);
        setSelected(null);
        setValue(null);
    }

    return (
        <>
        <div className="text-center mb-3">
            <button type="button" className="btn btn-success text-center" data-toggle="modal" data-target="#modalSuerte">
                Maquinita De La Suerte
            </button>
        </div>
        
        <div className="modal fade" id="modalSuerte" tabIndex="-1" role="dialog" aria-labelledby="modalSuerteTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header text-center">
                <h5 className="modal-title" id="exampleModalLongTitle">Numeros Aleatorios</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={clearRandom} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <h6 className="text-center">Cuantos numeros quieres?</h6>
                <div className="container">
                    <div className="mt-5 m-auto w-75 pb-4">
                        <Select options={options} onChange={handleChange} value={value} placeholder="Selecciona" />
                    </div>
                </div>
                <div className="container text-center">
                        {
                        israndom.map((e) => {
                            const formatoNumero = e.toString().padStart(4, '0');
                            return (
                                <p className="btn m-1 col--full" key={formatoNumero}>{formatoNumero}</p>
                            )
                        })
                        }
                    </div>
            </div>
            <div className="modal-footer">
                {
                    (israndom.length > 0) 
                    ? (
                        <>
                        <button className="btn btn-primary" onClick={generarRandom}>
                        <i className="fa-solid fa-recycle"></i> Nuevos Numeros</button>
                        <button className="btn btn-danger" onClick={selectRandom} data-dismiss="modal">Apartar</button>
                        </>
                    )
                    : <button className="btn btn-primary" onClick={generarRandom}>Generar</button>
                }
            </div>
            </div>
        </div>
        </div>
        </>
)}