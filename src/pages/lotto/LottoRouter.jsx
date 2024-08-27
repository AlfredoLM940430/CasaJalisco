import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { IndexPage } from "./IndexPage"
import { BoletajePage } from "./BoletajePage"
import { MiBoleto } from "./MiBoleto"
import { InfoPage } from "./InfoPage"
import { NavBar } from "../../components/NavBar"

export const LottoRouter = () => {
    return (
    <>
        <NavBar/>
        <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/boletos" element={<BoletajePage/>}/>
            <Route path="/mi-boleto" element={<MiBoleto/>}/>
            <Route path="/info" element={<InfoPage/>}/>
            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
    </>
)}