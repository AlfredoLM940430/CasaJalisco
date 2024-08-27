import Modal from 'react-bootstrap/Modal';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useState } from 'react';

export const LogoutApp = () => {

    const { user, startLogout } = useAuthStore();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOut = () => {
        setShow(false);
        startLogout();
    }
    
    return (
    <>
        <li className="nav-item">
            <button className="nav-link" onClick={handleShow} href="#"><i className="fa-solid fa-power-off"></i> {user.name}</button>
        </li>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <h5 className="modal-title" id="exampleModalLongTitle">{user.name}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Deseas cerrar sesión?</p>
            </Modal.Body>
            
            <Modal.Footer>
                <button className='btn btn-warning' onClick={handleClose}><i className="fa-solid fa-rotate-left"></i> Cancelar</button>
                <button className='btn btn-dark' onClick={logOut}><i className="fa-solid fa-power-off"></i> Cerrar sesión</button>
            </Modal.Footer>
        </Modal>
    </>
)}