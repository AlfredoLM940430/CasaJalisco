import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import AuthPages from "../pages/auth/AuthPages";
import ScrollToTop from "../helpers/ScrollToTop";
import { HomeView } from "../pages/auth/views/HomeView";
import { LottoRouter } from "../pages/lotto/LottoRouter";
import { Footer } from "../components/Footer";
import { LoginPage } from "../pages/lotto/LoginPage";
import { RegistrosApp } from "../pages/auth/views/RegistrosApp";
import { ControlApp } from "../pages/auth/views/ControlApp";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect, useState } from "react";
import { AdminNav } from "../pages/auth/components/AdminNav";

export const AppRouer = () => {

    const { checkAuthToken } = useAuthStore();

    const { status } = useAuthStore();
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkAuthToken();
    }, []);

    useEffect(() => {
        if(status === 'authenticated') {
            setAuth(true);
            navigate("/admin")
        } else if (status === 'not-authenticated') {
            setAuth(false);
            //navigate("/login")
        } else {
            setAuth(false);
        }
    }, [status]);

    useEffect(() => {
        if(location.pathname == '/login' && auth) {
            navigate("/admin");
        }
    }, [location]);

    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/*" element={<LottoRouter/>}/>
    
                <Route element={<AuthPages isAllowed={auth}/>} >
                    <Route path="/admin" element={<HomeView/>}/>
                    <Route path="/registro" element={<RegistrosApp/>}/>
                    <Route path="/control" element={<ControlApp/>}/>
                </Route>

            </Routes>
            <Footer/>
        </>
)}