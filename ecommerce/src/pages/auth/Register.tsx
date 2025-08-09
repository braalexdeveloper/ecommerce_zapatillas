import './regsiter.css'

export const Register=()=>{
    return(
        <>
        <div className="register-container">
    <div className="register-card">
        <h1 className="register-title">Crear Cuenta</h1>
        
        <form className="register-form">
            <div className="form-group">
                <label htmlFor="email">Correo Electrónico*</label>
                <input type="email" id="email" name="email" placeholder="tucorreo@ejemplo.com" required/>
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Contraseña*</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required/>
                {/*<div className="password-hint">Mínimo 8 caracteres</div>*/}
            </div>
            
            {/*         
            <div className="form-terms">
                <input type="checkbox" id="terms" name="terms" required/>
                <label htmlFor="terms">Acepto los <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>*</label>
            </div>
             */} 
            <button type="submit" className="register-button">Registrarse</button>
        </form>
        
        <div className="login-redirect">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </div>
    </div>
</div>

        </>
    )
}