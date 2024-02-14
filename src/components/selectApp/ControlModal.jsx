import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '1rem',
    boxShadow: 90,
    p: 4,
};

const styleRandom = {
    width: 100,
}

const options1 = [1];
const options2 = [1,3];
const options = [1,3,10];

export const ControlModal = ({boletos, isApartado, setIsApartado}) => {
    
    if((boletos.length <= 4 || isApartado.length >= 15)) {
        return;
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setIsrandom([]);
        setOpen(false);
    }
    const [selected, setSelected] = useState(null);
    const [israndom, setIsrandom] = useState([])

    function onChange(i) {
        setSelected((prev) => (i === prev ? null : i));
      }
    
    function whatDidIPick() {
        if(isApartado.length > 9) {
            handleClose()
            return;
        } 
        let baux = [];
        let GN = 0;
        let aux = boletos.filter(val => !isApartado.includes(val))
        for (let i = 0; i < options[selected]; i++) {
            GN = aux[Math.floor(Math.random()*aux.length)];
            if(baux.includes(GN)) {
                i--
                baux = baux;
            } else {
                baux = [...baux, GN];
            }
        }

        isApartado.forEach((a) => {
            baux = [...baux, a]
        })
        console.log(baux);
        setIsrandom(baux);

        // setIsApartado(baux);
        // handleClose()
    }


    const seleccionChk = () => {
        if (boletos.length < 10) {
            return (

                options2.map((o, i) => (
                    <label key={i}>{o}
                        <input
                            className="ml-5"
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
        return (
            options.map((o, i) => (
                <label key={i} className="">
                    {o} <input type="checkbox" checked={i === selected} onChange={() => onChange(i)} />
                </label>
            ))
        );
        // return (options.map((o, i) => (
        //     <div className="form-check-inline mb-2">
        //         <label className="form-check-label" key={i}>
        //             {o} <input 
        //                 type="checkbox" c
        //                 lassName="form-check-input text-center" 
        //                 checked={i === selected} 
        //                 onChange={() => onChange(i)}/>
        //         </label>
        //     </div>
            
        // )))
    }

    function handleRandom() {

    }

    return (
        <>
            <Button className="" variant="contained" color="success" onClick={handleOpen}>Maquinita De La Suerte</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4 className="text-center">Cuanto Boletos Deseas?</h4>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    <div className="chk-input">
                        {seleccionChk()}
                    </div>
                    <div className="text-center">
                        {
                            (israndom.length > 0) 
                            ? <button className="btn btn-primary m-3" onClick={whatDidIPick}>Generar Otros Numeros</button>
                            : <button className="btn btn-primary m-3" onClick={whatDidIPick}>Generar</button>
                        }
                    </div>
                    
                    <div className="container d-flex justify-content-center random-box">
                        {
                        israndom.map((e) => {
                            const formatoNumero = e.toString().padStart(4, '0');
                            return (
                                <li className="btn m-1 col--full" key={formatoNumero}>{formatoNumero}</li>
                            )
                        })
                        }
                    </div>

                    {(israndom.length > 0) ? <button onClick={handleRandom}>Seleccionar</button> : <></>}
                    
                </Box>
            </Modal>
        </>
)}