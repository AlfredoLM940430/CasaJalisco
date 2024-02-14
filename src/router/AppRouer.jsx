import { Navigate, Route, Routes } from "react-router-dom"
import { IndexPage } from "../pages/lotto/IndexPage"
import { LottoDash } from "../pages/auth/LottoDash";
import AuthPages from "../pages/auth/AuthPages";
import { BoletajePage } from "../pages/lotto/BoletajePage";
import ScrollToTop from "../helpers/ScrollToTop";
import { InfoPage } from "../pages/lotto/InfoPage";
import { MiBoleto } from "../pages/lotto/MiBoleto";

export const AppRouer = () => {

    const auth = true;

    return (
        <>
        <ScrollToTop/>
        <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/boletos" element={<BoletajePage/>}/>
            <Route path="/mi-boleto" element={<MiBoleto/>}/>
            <Route path="/info" element={<InfoPage/>}/>
 
            <Route element={<AuthPages isAllowed={!!auth}/>} >
                <Route path="/admin" element={<LottoDash/>}/>
            </Route>

            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
        </>
)}