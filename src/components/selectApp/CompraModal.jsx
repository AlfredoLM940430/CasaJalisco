import { useEffect, useMemo } from "react";
import { useState } from "react";

export const CompraModal = ({isApartado}) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        whats: '',
        nombre: '',
        apellido: '',
        boletos: JSON.stringify(isApartado),
    });

    useEffect(() => {
        setFormValues({
            ...formValues,
            boletos: JSON.stringify(isApartado),
        });
    }, [isApartado]);
    
    const onInputChange = ({target}) => {
        if(target.name === 'whats'){
            if(target.value.length > 10) target.value = target.value.slice(0, 10);
            target.value = target.value.replace(/\D/g, '');
        }
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }
    
    const is_Valid = useMemo(() => {
        if(!formSubmitted) return '';
        return (formValues.whats.length > 9)
            ? ''
            : 'is-invalid';
    }, [formValues.whats, formSubmitted])

    const onSubmit = (e) => {
        setFormSubmitted(true);

        e.preventDefault();
        console.log(formValues.whats.length);
        if(formValues.whats.length <= 0 || formValues.nombre.length <= 0 || formValues.apellido.length <= 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios",
            });
            return;
        }

        if(formValues.whats.length !== 10) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Numero de Whatsapp No Valido",
            });
            return;
        }
    }
    
    return ( 
        <div className="modal-compra">
            <button type="button" className="btn" data-toggle="modal" data-target="#modalCompra">
            Comprar
            </button>

            <div className="modal fade" id="modalCompra" tabIndex="-1" role="dialog" aria-labelledby="modalCompraTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Completa tus datos</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Tu Whatsapp</label>
                        <input type="tel" className={`form-control ${is_Valid}`} name="whats" value={formValues.whats} onChange={onInputChange} placeholder="(10 Digitos)"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tu(s) Nombre(s)</label>
                        <input type="text" className={`form-control`} name="nombre" value={formValues.nombre} onChange={onInputChange} placeholder="Nombre"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tus Apellidos</label>
                        <input type="text" className={`form-control`} name="apellido" value={formValues.apellido} onChange={onInputChange} placeholder="Apellidos"/>
                    </div>
                    {
                        (isApartado.length > 1)
                        ? <p className="isApartado text-center">Boletos: {JSON.stringify(isApartado)}</p>
                        : <p className="isApartado text-center">Boleto: {JSON.stringify(isApartado)}</p>
                    }
                    <button type="submit" className="btn w-100">Apartar</button>
                </form>
                </div>
                </div>
            </div>
            </div>
        </div>     
)}