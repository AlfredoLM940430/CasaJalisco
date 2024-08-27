export const Footer = () => {
    const fecha = new Date();
    return (
        <footer className="lotto-footer">
            <div>
                <div className="main p-2 m-0">
                    <p className="text-center m-0">_FRD® {fecha.getFullYear()}</p>
                </div>
            </div>
        </footer>
)}