import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
// import { BoletosApp } from "./BoletosApp";
import { NumerosApartados } from "./NumerosApartados";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 90,
    p: 4,
};

const options1 = [1];
const options2 = [1,3];
const options = [1,3,10];

export const SeleccionApp = () => {

    //! Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //! Busca tu numero
    const [value, setValue] = useState('');
    
    //! Numeros apartados
    const [aparN, setApartN] = useState([]);

    //! Seleccion [Optiosn]
    const [selected, setSelected] = useState(null);

    //! Boletaje
    let APIBoletos = [];
    for (let i = 1; i <= 60; i++) {
        APIBoletos = [...APIBoletos, i]
    }
    const [boletos, setBoletos] = useState(APIBoletos);

    //! OnChange Input
    const handleChange = event => {
        if(event.target.value.length > 5) event.target.value = event.target.value.slice(0, 5);
        let number = event.target.value.replace(/\D/g, '');
        setValue(number);
    }


    const isEmpty = () => {
        if (value === '') return (
            <>
                <button className="btn btn-success" onClick={luckyN}>Maquinita De La Suerte</button>
            </>)
        return <p className="text-center">Numero no Disponible</p>
    }

    const Nvalido = () => {
        const formatoNum = value.toString().padStart(4, '0');
        if (aparN.includes(Number(value))) {
            return <p className="text-center">Ya Tienes Apartado Este Numero</p>
        }
        return (
            <>
                <p className="text-center">Numero Disponible</p>
                <button className="btn btn-success" onClick={selectNumber}>Apartar Numero: [{formatoNum}]</button>
            </>
        )
    }

    const selectNumber = (e) => {
        e.preventDefault();
        const num = e.target.textContent.match(/\d/g);
        localStorage.setItem('numero', Number(num.join("")));
        setApartN(aparN => [...aparN, Number(localStorage.getItem('numero'))]);
        setValue('')
    }

    const selectN = (e) => {
        if (aparN.includes(Number(e.target.innerText))) {
            Swal.fire("Ya tienes apartado este numero!");
            return;
        }
        localStorage.setItem('numero', Number(e.target.innerText));
        setApartN(aparN => [...aparN, Number(localStorage.getItem('numero'))]);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Numero agregado",
            showConfirmButton: false,
            timer: 700
        });
    }

    const deleteN = (e) => {
        // console.log(Number(e.target.innerHTML));
        setApartN(aparN.filter(el => el !== Number(e.target.innerHTML)))
    }

    function luckyN() {
        let aux = boletos.filter(val => !aparN.includes(val)) 
        let GN = aux[Math.floor(Math.random()*aux.length)];
        console.log(GN);
    }

    function onChange(i) {
        setSelected((prev) => (i === prev ? null : i));
      }
    
    function whatDidIPick() {
        if(aparN.length > 9) {
            handleClose()
            return;
        } 
        let baux = [];
        let GN = 0;
        let aux = boletos.filter(val => !aparN.includes(val))
        for (let i = 0; i < options[selected]; i++) {
            GN = aux[Math.floor(Math.random()*aux.length)];
            if(baux.includes(GN)) {
                i--
                baux = baux;
            } else {
                baux = [...baux, GN];
            }
        }

        aparN.forEach((a) => {
            baux = [...baux, a]
        })

        console.log(baux);
        setApartN(baux);
        //console.log(aparN);
        // console.log(baux);
        // console.log(aux);
        
        //setApartN(...aparN, baux);
        //console.log(`${aparN}`);

        //     let GN = aux[Math.floor(Math.random()*aux.length)];
        //     setApartN(...aparN, GN)
        //     // baux = [...baux, GN];
        //     // localStorage.setItem('numero', Number(GN));
        //     // setApartN(aparN => [...aparN, Number(localStorage.getItem('numero'))]);
        // }

        // baux.forEach((n) => {
        //     console.log(n);
        //     localStorage.setItem('numero', n);
        //     setApartN(aparN => [...aparN, Number(localStorage.getItem('numero'))]);
        // })

        // console.log(baux);

        // console.log(options[selected] || 'nothing');
        // handleClose()
        // setSelected(null);
    }

    const seleccionChk = () => {
        if (boletos.length < 10) {
            return (
                options2.map((o, i) => (
                    <label key={i}>
                    {o}
                    <input
                        type="checkbox"
                        checked={i === selected}
                        onChange={() => onChange(i)}
                    />
                    </label>
                ))    
            );
        }
        if (boletos.length < 5) {
            return (
                options1.map((o, i) => (
                    <label key={i}>
                    {o}
                    <input
                        type="checkbox"
                        checked={i === selected}
                        onChange={() => onChange(i)}
                    />
                    </label>
                ))
            );
        }
        return (options.map((o, i) => (
            <label key={i}>
            {o}
            <input
                type="checkbox"
                checked={i === selected}
                onChange={() => onChange(i)}
            />
            </label>
        )))
    }

    return (
        <>
            <div id="BoletosId">
                <div className="boletos d-flex justify-content-center">
                    <div className="align-self-center">
                        <p className="text-center container">Encuentra aqui abajo tu numero de la suerte!<i className="fa-solid fa-clover"></i></p>
                    </div>
                </div>

                {<NumerosApartados props={aparN} deleteN={deleteN}/>}

                <div className="mt-4 mb-4">
                    <input className="form-control" value={value} placeholder="Busca Tu Numero" onChange={handleChange} />
                </div>
                
                {
                    (boletos.includes(Number(value)))
                    ? Nvalido()
                    : isEmpty()
                }

                {/* <button className="btn btn-success">Maquinita De La Suerte</button> */}
                

                <h5 className="text-center">Numeros Disponibles</h5>
            </div>

            <div className="d-flex justify-content-center mb-5">
                <div className="" id="global">
                    <div className="grid-it" id="mensajes">
                    {
                        boletos.map((e) => {
                            const formatoNumero = e.toString().padStart(4, '0');
                            return <li 
                                className="btn m-1 col--full" 
                                style={{
                                    backgroundColor: (aparN.includes(e)) ? 'blue' : ''
                                }}
                                onClick={selectN} 
                                key={formatoNumero}>{formatoNumero}</li>
                        })
                    }
                    </div>
                </div>
            </div>
            
            {
                (boletos.length <= 4 || aparN.length >= 10) ? <></>
                :<Button onClick={handleOpen}>Open modal</Button>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <div>
                        {
                            seleccionChk()
                        }
                        <br />
                        {

                        }
                        <button onClick={whatDidIPick}>Log what I picked</button>

                        {

                        }
                    </div>
                </Box>
            </Modal>
        </>
)}