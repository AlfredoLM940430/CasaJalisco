import { useAdminStore } from "./useAdminStore";

export const useTicket = () => {

    const { startSavingConfirmed, startDeleteUnconfirmed } = useAdminStore();
    
    const startBuying = (element) => {
        let aux = JSON.parse(element.target.parentElement.id);
        Swal.fire({
            title: `Confirmar compra?`,
            html: `Usuario: ${aux.usuario} <br><br> Boleto: [${aux.numero.toString().padStart(5, '0')}]`,
            showCancelButton: true,
            confirmButtonText: "Confirmar",
        }).then((result) => {
            if (result.isConfirmed) {
                const confirmTicket = {
                    telefono: aux.telefono,
                    boleto: aux.numero,
                }
                startSavingConfirmed(confirmTicket);                
            }
        });
    }

    const startDeleting = (element) => {
        let aux = JSON.parse(element.target.parentElement.id)
        Swal.fire({
            title: "Eliminar boletos apartados?",
            html: `Usuario: ${aux.usuario} <br><br> Boleto: [${aux.numero.toString().padStart(5, '0')}]`,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#ff0000",
        }).then((result) => {
            if (result.isConfirmed) {
                const unconfirmTicket = {
                    telefono: aux.telefono,
                    boleto: aux.numero,
                }
                startDeleteUnconfirmed(unconfirmTicket);
            }
        });
    }

    return {
        startBuying,
        startDeleting
    }
}