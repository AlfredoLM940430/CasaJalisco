export const BoletosApp = () => {
    
    let APIBoletos = [];
    for (let i = 1; i <= 600; i++) {
        APIBoletos = [...APIBoletos, i]
    }

    return {
        APIBoletos,
    };
}