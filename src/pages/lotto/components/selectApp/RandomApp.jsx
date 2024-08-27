import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Animacion } from './Animacion';

export const RandomApp = ({boletos, isApartado, setIsApartado}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let options = [
        { value: 1, label: "1 Numero" },
        { value: 5, label: "5 Numeros" },
        { value: 10, label: "10 Numeros" },
    ];

    const [isOption, setIsOption] = useState(options);
    const [israndom, setIsrandom] = useState([]);
    const [selected, setSelected] = useState('');
    const [value, setValue] = useState(null);

    useEffect(() => {
        if((boletos.length - isApartado.length) < 10 && isApartado.length > 0) {
            setIsOption([
                { value: 1, label: "1 Numero" },
                { value: (boletos.length - isApartado.length), label: `${boletos.length - isApartado.length} Numeros` },
            ]);
            return;
        }
        setIsOption(options);
    }, [isApartado]);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption.value);
        setValue(selectedOption)
    };

    const generarRandom = () => {
        let baux = [];
        let GN = 0;
        let control = 0;
        for (let i = 0; i < selected; i++) { 
            GN = (Math.floor(Math.random() * (boletos.length - 1 + 1) + 1)) - 1;
            if(isApartado.includes(boletos[GN].numero)) {
                control++;
            } else if(baux.includes(boletos[GN].numero)) {
                control++;
            } else {
                baux = [...baux, boletos[GN].numero];
            }
            if(control > 0) {
                i--;
            }
            control = 0;
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
        setShow(false);
    }
  
    return (
      <>
        <div className="text-center mb-3">
            <button type="button" className="btn btn-success text-center" onClick={handleShow}>
                Maquinita De La Suerte
            </button>
        </div>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="modal-title" id="exampleModalLongTitle">Numeros Aleatorios</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="text-center">Cuantos numeros quieres?</h6>
                <div className="container">
                    <div className="mt-5 m-auto w-75 pb-4">
                        <Select isSearchable={false} options={isOption} onChange={handleChange} value={value} placeholder="Selecciona" />
                    </div>
                </div>
                <div className="container text-center">
                    { 
                        (israndom.length > 0) 
                        ? <Animacion israndom={israndom}/>
                        : <img src="img/dados.gif" alt="" />      
                    }
                </div>
            </Modal.Body>
            
            <Modal.Footer>
                {
                    (israndom.length > 0) 
                    ? (
                        <>
                        <button className="btn btn-warning" onClick={generarRandom}>
                        <i className="fa-solid fa-recycle"></i> Nuevos Numeros</button>
                        <button className="btn btn-primary" onClick={selectRandom} data-dismiss="modal">Apartar</button>
                        </>
                    )
                    : <button className="btn btn-primary" onClick={generarRandom}>Generar</button>
                }
          </Modal.Footer>
        </Modal>
      </>
)}