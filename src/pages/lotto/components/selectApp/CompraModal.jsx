import { useEffect, useMemo } from "react";
import { useState } from "react";
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLottoStore } from "../../../../hooks/useLottoStore";

export const CompraModal = ({isApartado, setIsApartado}) => {  
    
    const { startSavingBoletos, registro, usuarios } = useLottoStore();

    const [isUser, setIsUser] = useState('');

    /* Modal */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    
    const [isMessage, setIsMessage] = useState(false);

    /* Select */
    const options = [       
        { value: "Aguascalientes", label: "Aguascalientes"},
        { value: "Baja California", label: "Baja California"},
        { value: "Baja California Sur", label: "Baja California Sur"},
        { value: "Campeche", label: "Campeche"},
        { value: "Chiapas", label: "Chiapas"},
        { value: "Chihuahua", label: "Chihuahua"},
        { value: "Ciudad de México", label: "Ciudad de México"},
        { value: "Coahuila", label: "Coahuila"},
        { value: "Colima", label: "Colima"},
        { value: "Durango", label: "Durango"},
        { value: "Estado de México", label: "Estado de México"},
        { value: "Guanajuato", label: "Guanajuato"},
        { value: "Guerrero", label: "Guerrero"},
        { value: "Hidalgo", label: "Hidalgo"},
        { value: "Jalisco", label: "Jalisco"},
        { value: "Michoacán", label: "Michoacán"},
        { value: "Morelos", label: "Morelos"},
        { value: "Nayarit", label: "Nayarit"},
        { value: "Nuevo León", label: "Nuevo León"},
        { value: "Oaxaca", label: "Oaxaca"},
        { value: "Puebla", label: "Puebla"},
        { value: "Querétaro", label: "Querétaro"},
        { value: "Quintana Roo", label: "Quintana Roo"},
        { value: "San Luis Potosí", label: "San Luis Potosí"},
        { value: "Sinaloa", label: "Sinaloa"},
        { value: "Sonora", label: "Sonora"},
        { value: "Tabasco", label: "Tabasco"},
        { value: "Tlaxcala", label: "Tlaxcala"},
        { value: "Veracruz", label: "Veracruz"},
        { value: "Yucatán", label: "Yucatán"},
        { value: "Zacatecas", label: "Zacatecas"},
    ];

    const [value, setValue] = useState("");
    const handleChange = (selectedOption) => {
        setValue(selectedOption)
    };

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        telefono: '',
        nombre: '',
        apellido: '',
        estado: '',
        boletos: JSON.stringify(isApartado),
    });

    useEffect(() => {
        setFormValues({
            ...formValues,
            boletos: JSON.stringify(isApartado),
            estado: value.label,
        });
    }, [isApartado, value]);
    
    const onInputChange = ({target}) => {

        if(target.name === 'telefono'){
            if(target.value.length > 10) target.value = target.value.slice(0, 10);
            target.value = target.value.replace(/\D/g, '');
            if(target.value.length === 10) {
                let find = {};
                find = usuarios.find(el => el.telefono === target.value);
                setIsUser(find);
            }
        }

        if(target.name === 'nombre' || target.name === 'apellido') {           
            target.value = target.value.replace(/[^A-zÀ-ú\s]+/, '').trim();
        }
        
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    useEffect(() => {
        if(isUser !== '' && isUser !== undefined) {
            setValue({value: isUser.estado, label: isUser.estado});
            setFormValues({
                ...formValues,
                nombre: isUser.nombre,
                apellido: isUser.apellido,
                estado: value.label,
            });
        }
    }, [isUser]);
    
    const is_Valid = useMemo(() => {
        if(!formSubmitted) return '';
        return (formValues.telefono.length > 9)
            ? ''
            : 'is-invalid';
    }, [formValues.telefono, formSubmitted]);

    const onCompra = (e) => {
        e.preventDefault();
        if(isMessage === false) {
            Swal.fire("Al finalizar, seras redirigido a WhatsApp para continuar con la compra. Mucha Suerte!");
            setIsMessage(true);
        }
        setShow(true);
    }

    const sanitizer = () => {
        const sname = formValues.nombre.replace(/[^a-zA-Z ]/g, "");
        const sapellido = formValues.apellido.replace(/[^a-zA-Z ]/g, "");

        setFormValues({
            ...formValues,
            nombre: sname,
            apellido: sapellido,
            estado: value.label,
        });
    }

    const onSubmit = async(e) => {

        setFormSubmitted(true);        
        e.preventDefault();
        const instructions = document.querySelector("#instructions");

        if(formValues.telefono === '' || formValues.nombre === '' || formValues.apellido === '' || formValues.estado === undefined) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios",
            });
            return;
        }
        if(formValues.telefono.length !== 10) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Numero de whatsapp no valido!",
            });
            return;
        }        

        //* SAVE *//
        const response = await startSavingBoletos(formValues);
        
        //! Ningun boleto apartado *//
        if(response.isApartados.length === 0) {
            setIsApartado([]);
            setFormValues({
                telefono: '',
                nombre: '',
                apellido: '',
                estado: '',
                boletos: JSON.stringify(isApartado),
            });
            //setIsMessage(false);
            //setShow(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                html: "Alguien aparto tu(s) numero(s) justo antes que tu! <br><br> Intenta con otro(s)",
            }).then(() => {
                window.location.reload();
            });
            return;
        }
     
        //! Boletos Mixtos !//
        if((response.isApartados.length > 0) && (response.noApartados.length > 0)) {
            setIsApartado([]);
            setFormValues({
                telefono: '',
                nombre: '',
                apellido: '',
                estado: '',
                boletos: JSON.stringify(isApartado),
            });
            //setIsMessage(false);
            //setShow(false);

            //* FORMATO SWAL *//
            const addIs = (arr) => {                
                let optionItems = '';
                arr.forEach(e =>{
                    const formatoNumero = e.toString().padStart(5, '0');
                    optionItems += `<li className="btn m-1 col--full" key={${formatoNumero}}>{${formatoNumero}}</li>`
                })
                return optionItems
            }
            const addNo = (arr) => {              
                let optionItems = '';
                arr.forEach(e =>{
                    const formatoNumero = e.toString().padStart(5, '0');
                    optionItems += `<li className="btn m-1 col--full" key={${formatoNumero}}>{${formatoNumero}}</li>`
                })
                return optionItems
            }
               
            Swal.fire({
                icon: "warning",
                title: "Alguien aparto algún numero antes que tu!",
                html: "El resto fue apartado." + "\n" + "<br><br> Boleto(s) apartado(s): " + addIs(response.isApartados) + "\n" + "<br> Boleto(s) no apartado(s): " + addNo(response.noApartados),
            }).then(() => {
                instructions.click();
                window.location.href = '/';
            });
            return;
        }

        //! Boletos Apartados !//
        setIsApartado([]);
        setFormValues({
            telefono: '',
            nombre: '',
            apellido: '',
            estado: '',
            boletos: JSON.stringify(isApartado),
        });
        //setIsMessage(false);
        //setShow(false);
        instructions.click();
        window.location.href = '/';
    }

    //TODO: WHATSAPP
    function fixedEncodeURIComponent () {

        if(registro.apartados === undefined) {
            return;
        }

        let aux = registro.apartados.map((a) => {
            const formatoNumero = a.toString().padStart(5, '0')
            return "-["+formatoNumero+"]-"
        });

        let total = 0;
        if(registro.apartados.length >= 1 && registro.apartados.length < 5) {
            total = registro.apartados.length * 10;
        }

        if(registro.apartados.length >= 5 && registro.apartados.length <= 9) {
            total = registro.apartados.length * 7;
        }
        if(registro.apartados.length >= 10) {
            total = registro.apartados.length * 5;  
        }

        let variables = `Hola, Aparte boletos para el sorteo de $150,000 pesos! 🍀
---------------------------------------------------------
${registro.apartados.length} ${registro.apartados.length > 1 ? "BOLETOS" : "BOLETO"}
*${aux}
Nombre: *${formValues.nombre.trim()}*
Celular: *${formValues.telefono}*

1 Boleto por -->; $10c/u
+ de 5 Boletos por -->; $7c/u
+ de 10 Boletos por -->; $5c/u

Total por ${registro.apartados.length} ${registro.apartados.length > 1 ? "boletos" : "boleto"}: *$${total}*
---------------------------------------------------------
Información de pago: https://lottery-page.netlify.app/info
El siguiente paso es enviar foto del comprobante de pago por aquí.`;
        return encodeURIComponent(variables).replace(/[!'()]/g, '').replace(/\*/g, "%2A");
    }

    return (
        <>
            <div className="modal-compra">
            <Button onClick={onCompra}>
                Comprar
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5 className="modal-title">Completa tus datos</h5></Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Tu Whatsapp</label>
                                <input type="tel" className={`form-control ${is_Valid}`} name="telefono" value={formValues.telefono} onChange={onInputChange} placeholder="(10 Digitos)"/>
                            </div>
                            <div className="form-group">
                                <label>Tu(s) Nombre(s)</label>
                                <input type="text" className={`form-control`} name="nombre" value={formValues.nombre} onChange={onInputChange} placeholder="Nombre"/>
                            </div>
                            <div className="form-group">
                                <label>Tus Apellidos</label>
                                <input type="text" className={`form-control`} name="apellido" value={formValues.apellido} onChange={onInputChange} placeholder="Apellidos"/>
                            </div>
                            <div className="form-group">
                                <label>Tu Estado:</label>
                                <Select options={options} onChange={handleChange} value={value} placeholder="Selecciona" />
                            </div>
                            {
                                (isApartado.length > 1)
                                ? <p className="boti text-center">Boletos: {isApartado.length} numeros</p>
                                : <p className="boti text-center">Boleto: {isApartado.length} numero</p>
                            }
                            <Button variant="primary" className="w-100 mt-2" onClick={sanitizer} type="submit">
                                Apartar
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
                <a id="instructions" target="_blank" rel="noopener" href={"https://api.whatsapp.com/send?phone=+523311486142&text=" + fixedEncodeURIComponent()}></a>
            </Modal>
            </div>
        </>
)}

/*
    <script>alerta('hacking')</script>

; admin' or '1'='1


"SANM631230791"

""

*/