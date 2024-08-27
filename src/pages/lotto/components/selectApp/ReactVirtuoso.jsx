import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";

export default function ReactVirtuoso({isLoadingEvents, boletos, isApartado, setIsApartado}) {

    const gridComponents = {
        List: forwardRef(({ style, children, ...props }, ref) => (
            <div ref={ref} {...props} style={{ display: "flex", flexWrap: "wrap", ...style, }}>
                {children}
            </div>
        )),
        Item: ({ children, ...props }) => (
            <div {...props} className={"grid-it"} style={{ display: "block", margin: "auto" }}>
                {children}
            </div>
        )
    }
      
    const ItemWrapper = ({ children, ...props }) => (
        <div {...props} className="btn m-1 col--full" onClick={handleSelect} style={{
            backgroundColor: (isApartado.includes(Number(children))) ? 'blue' : ''
        }}>
            {children}
        </div>
    );
    
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

    if(isLoadingEvents) {
        return <h5 className="text-center">Cargando...</h5>
    }
    
    return (
        <>
            <VirtuosoGrid
                style={{ height: 500 }}
                data={boletos}
                totalCount={boletos.length}
                components={gridComponents}
                itemContent={(index, boleto) => <ItemWrapper>{boleto.numero.toString().padStart(5, '0')}</ItemWrapper>}
            />
            <style>{`html, body, #root { margin: 0; padding: 0 }`}</style>
        </>
    );
}
