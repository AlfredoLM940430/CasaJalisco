import { useDispatch, useSelector } from "react-redux";
import lottoApi from "../api/casaJalisoApi";
import { clearErrorMsg, onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { onReset } from "../store/lotto/lottoSlice";

export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async ({email, contraseña}) => {
        
        dispatch(onCheking());
        
        try {
            const { data } = await lottoApi.post('/auth/login', {email, contraseña});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('Credenciales Incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMsg())
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());
        console.log('hola');
        return;
        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }
    

    const startLogout = () => {
        localStorage.clear();
        dispatch(onReset());
        dispatch(onLogout());
    }
    
    return {
        // Propiedades
        errorMessage,
        user,
        status,

        //Metodos
        startLogin,
        startLogout,
        checkAuthToken,
    }
}