import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { useContext, useState } from 'react'
import { authLogin } from './login.service';
import { UserContext } from '../../context/UserContext';

interface UserLogin {
    email: string;
    password: string;
}

export const Login = () => {

    const [user, setUser] = useState<UserLogin>({ email: '', password: '' });
    const navigate=useNavigate();

    const userContext=useContext(UserContext);
    if (!userContext) {
  throw new Error("Login must be used within a UserProvider");
}
    const { login }=userContext;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

    }

    const handleLogin=async()=>{
        const userLoguer=await authLogin(user);
        
        if(userLoguer.id){
            
            login(userLoguer);
            navigate("/mis-pedidos")
        }else{
            alert("Credenciales incorrectas")
        }
        console.log(userLoguer)
    }


    return (
        <>
            <div className="login-container">
                <div className="login-wrapper">
                    <div className="login-box">
                        <h1 className="login-title">Iniciar Sesión</h1>

                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input type="email" id="email" name="email" value={user?.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" name="password" value={user?.password} onChange={handleChange} placeholder="••••••••" required />
                            </div>

                            <div className="form-options">

                                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                            </div>

                            <button type="button" onClick={handleLogin} className="login-button">Ingresar</button>
                        </form>

                        <div className="login-divider">
                            <span>o</span>
                        </div>

                        <div className="social-login">
                            <button className="social-button google">
                                <i className="fab fa-google"></i> Continuar con Google
                            </button>
                            <button className="social-button facebook">
                                <i className="fab fa-facebook-f"></i> Continuar con Facebook
                            </button>
                        </div>

                        <div className="register-link">
                            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                        </div>
                    </div>

                    <div className="login-benefits">
                        <h2>Beneficios de registrarte</h2>
                        <ul className="benefits-list">
                            <li><i className="fas fa-check-circle"></i> Guarda tus datos para compras más rápidas</li>
                            <li><i className="fas fa-check-circle"></i> Revisa tu historial de pedidos</li>
                            <li><i className="fas fa-check-circle"></i> Accede a ofertas exclusivas</li>
                            <li><i className="fas fa-check-circle"></i> Crea una lista de deseos</li>
                        </ul>
                    </div>
                </div>
            </div>


        </>
    )
}