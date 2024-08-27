import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks/useAuthStore";
import { NavLink } from "react-router-dom";

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange } = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({email: loginEmail, contraseña: loginPassword});
    }

    useEffect(() => {
        if(errorMessage !== undefined) {
          Swal.fire('Error en la autenticación', errorMessage, 'error');
        }    
    }, [errorMessage]);

    return (
    <>
        <NavLink className="login-home text-white" to="/"><i className="fa-solid fa-house"></i></NavLink>
        <div className="login-main">
            <div className="container d-flex align-items-center justify-content-center" style={{height: "96vh"}}>
                <form onSubmit={loginSubmit}>
                    <div className="form-group mb-4">
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="loginEmail"
                            value={ loginEmail }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="loginPassword"
                            value={ loginPassword }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input 
                            type="submit"
                            className="btn btn-success"
                            value="Iniciar Sesión" 
                        />
                    </div>
                </form>
            </div>
        </div>
    </>
)}