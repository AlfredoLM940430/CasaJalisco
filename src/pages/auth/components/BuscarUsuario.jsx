import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const BuscarUsuario = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isboleto, setIsboleto] = useState(false);
    const [isValid, setIsValid] = useState('');

    const celular = ['3311486142','3333333333'];
    
    const findCel = (e) => {
        setIsboleto(false);
        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
        if(number.length === 10) {
            e.target.blur();
        }
    }
    
    useEffect(() => {
        if(celular.includes(isValid)) {
            setIsboleto(true);
            setIsValid('');
            return;
        }
        if(isValid.length >= 10 && !celular.includes(isValid)) {
            Swal.fire("Numero no econtrado");
            setIsValid('');
            return;
        }
    }, [isValid])

    return (
        <>
        <Button className='fa-circle-helper' variant="link" onClick={handleShow}>
            <i class="fa-solid fa-circle-question"></i>
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Bucar Boletos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=""> 
                    <div className="container d-flex justify-content-center mb-5">
                        <input className="form-control" type="tel" placeholder='Celular' value={isValid} onChange={findCel}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Buscar Boletos
                </Button>
            </Modal.Footer>
        </Modal>
        </>
)}