export const ControlBoletos = ({boletos, isApartado, setIsApartado}) => {

    const handleSelect = (e) => {
        if(isApartado.includes(Number(e.target.innerText))) {
            Swal.fire("Ya tienes apartado este numero!");
            return;
        }
        localStorage.setItem('numero', Number(e.target.innerText));
        setIsApartado(isApartado => [...isApartado, Number(localStorage.getItem('numero'))]);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Numero agregado",
            showConfirmButton: false,
            timer: 700
        });
    }  
    return ( 
        boletos.map((e) => {
        const formatoNumero = e.toString().padStart(4, '0');
        return (
            <li className="btn m-1 col--full" 
                style={{
                    backgroundColor: (isApartado.includes(e)) ? 'blue' : ''
                }}
                onClick={handleSelect} 
                key={formatoNumero}>{formatoNumero}
            </li>
        )
    })    
)}