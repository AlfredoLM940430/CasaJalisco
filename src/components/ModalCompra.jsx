// import Select from 'react-select'
// import { useState } from "react";
// import Modal from "react-modal"

// const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//     },
// };

// Modal.setAppElement('#root');

// export const ModalCompra = (handleCompra) => {

//     const [isOpen, setIsOpen] = useState(true);
//     const [formValues, setFormValues] = useState({

//     })

//     const onCloseModal = () => {
//         setIsOpen(false);
//         console.log('cerrando modal');
//     }

//     return (
//         <Modal
//         isOpen={isOpen}
//         onRequestClose={onCloseModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//         className="modal"
//         overlayClassName="modal-fondo"
//         closeTimeoutMS={200}
//         >
//             <h1 className="text-center">LLENA TUS DATOS Y DA CLICK EN APARTAR</h1>
//             <p className="text-center">1 BOLETO SELECCIONADO</p>
//             <hr />
//             <form className="container">

//                 <div className="form-group mb-2">
//                     <input className="form-control" placeholder="Numero de Whatsapp (10 Digitos)" />
//                 </div>

//                 <div className="form-group mb-2">
//                     <input className="form-control" placeholder="Nombre(s)" />
//                 </div>
//                 <div className="form-group mb-2">
//                     <input className="form-control" placeholder="Apellidos" />
//                 </div>

//                 <hr />

//                 <button
//                     type="submit"
//                     className="btn btn-outline-primary btn-block"
//                 >
//                     <i className="far fa-save"></i>
//                     <span> APARTAR</span>
//                 </button>

//             </form>
//         </Modal>
// )}