export const Animacion = ({israndom}) => {
    
    return israndom.map((e) => {
        const formatoNumero = e.toString().padStart(4, '0');
        return (
            <p className="btn m-1 col--full" key={formatoNumero}>{formatoNumero}</p>
        )
    })
}
