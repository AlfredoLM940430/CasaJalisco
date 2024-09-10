import { useEffect, useMemo, useState } from "react";
import { useLottoStore } from "./useLottoStore";

export const useSaving = (isApartado, setIsApartado) => {

    console.log(isApartado);
    

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
                console.log(find);
                
                setIsUser(find);
            }
        }

        if(target.name === 'nombre' || target.name === 'apellido') {
            target.value = target.value.replace(/[^A-zÀ-ú\s]+/, '');
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

    return {
        formValues, 
        onSubmit, 
        onInputChange, 
        handleChange, 
        options, 
        value,
        is_Valid,
    }
}