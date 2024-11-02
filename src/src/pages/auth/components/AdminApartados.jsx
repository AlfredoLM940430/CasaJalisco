import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import { useSaving } from '../../../hooks/useSaving';
import { useLottoStore } from '../../../hooks/useLottoStore';
import { useEffect, useState } from 'react';

export const AdminApartados = () => {

    const admin = true;
    const { startLoadingUsers } = useLottoStore();
    const [isApartado, setIsApartado] = useState([]);
    const [isValid, setIsValid] = useState('');
    const { formValues, onSubmit, onInputChange, handleChange, options, value, is_Valid } = useSaving(isApartado, setIsApartado, admin);

    const findBoleto = (e) => {

        if(e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
        let number = e.target.value.replace(/\D/g, '');
        setIsValid(number);
    }

    useEffect(() => {
        startLoadingUsers();
    }, []);

    const HandleApartados = () => {
        if(isApartado.includes(isValid)) {
            Swal.fire({
                icon: "warning",
                title: "Error",
                text: "Ya tienes apartado ese numero",
            });
            setIsValid('');
            return;
        }
        setIsApartado([...isApartado, Number(isValid)]);
        setIsValid('');
    }

    const deleteSelec = (e) => {
        //console.log( typeof(Number(e.target.attributes.name.value)));
        setIsApartado(isApartado.filter(item => item !== Number(e.target.attributes.name.value)));
    }

    console.log(isValid);
    console.log(isApartado);
    
    const formato = isValid.toString().padStart(5, '0');

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
                        <div className="n-ticket">
                            {/* <label className='text-white'>Boleto</label> */}
                            <div className="container d-flex justify-content-center">
                                <input className="form-control" type="tel" placeholder='Boleto?' value={isValid} onChange={findBoleto}/>
                            </div>
                        </div>
                        {(formato == '00000') ? <></> : <button className='btn btn-primary ml-5' onClick={HandleApartados}>Agregar el numero {formato} </button>}
                        {isApartado.length > 0 ? <p className='text-white'>{isApartado.length} Boletos Seleccionados:</p> : <></>}
                        {isApartado.map((e) => {
                            return (
                                <div className="" key={e}>
                                    <p className="text-white">[{e.toString().padStart(5, '0')}]
                                        <span className="ml-1" onClick={deleteSelec}>
                                            <i name={e} className="fa-solid fa-square-xmark"></i>
                                        </span>
                                    </p>
                                </div>                                      
                            )
                        })}

                        <Button variant="primary" className="w-100 mt-5" type="submit">
                            Apartar
                        </Button>
                    </form>
                </div>
            </div>
        </>
)}