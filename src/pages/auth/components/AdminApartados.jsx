import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import { useSaving } from '../../../hooks/useSaving';
import { useLottoStore } from '../../../hooks/useLottoStore';
import { useEffect, useState } from 'react';

export const AdminApartados = () => {

    const { startLoadingUsers } = useLottoStore();
    const [isApartado, setIsApartado] = useState([]);
    const { formValues, onSubmit, onInputChange, handleChange, options, value, is_Valid } = useSaving();

    useEffect(() => {
        startLoadingUsers();
    }, []);    

    return (
        <>
            <div className="registro-view">
                <div className="n-ticket">
                    <div className="p-4">
                        <hr className="m-0 hr-pink" />
                        <h4 className="text-center title p-2">Apartar Ticket</h4> 
                        <hr className="m-0 hr-pink" />
                    </div>
                </div>

                <div className="container">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className='text-white'>Whatsapp</label>
                            <input type="tel" className={`form-control ${is_Valid}`} name="telefono" value={formValues.telefono} onChange={onInputChange} placeholder="(10 Digitos)"/>
                        </div>
                        <div className="form-group">
                            <label className='text-white'>Nombre(s)</label>
                            <input type="text" className={`form-control`} name="nombre" value={formValues.nombre} onChange={onInputChange} placeholder="Nombre"/>
                        </div>
                        <div className="form-group">
                            <label className='text-white'>Apellidos</label>
                            <input type="text" className={`form-control`} name="apellido" value={formValues.apellido} onChange={onInputChange} placeholder="Apellidos"/>
                        </div>
                        <div className="form-group">
                            <label className='text-white'>Estado:</label>
                            <Select options={options} onChange={handleChange} value={value} placeholder="Selecciona" />
                        </div>
                        <div className="form-group">
                            <label className='text-white'>Boleto</label>
                            <input type="tel" className={`form-control`} name="boleto" placeholder="Numero de Boleto"/>
                        </div>
                        <Button variant="primary" className="w-100 mt-2" type="submit">
                            Apartar
                        </Button>
                    </form>
                </div>
            </div>
        </>
)}