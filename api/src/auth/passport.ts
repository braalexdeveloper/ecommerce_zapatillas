import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt";

//credenciales
const GOOGLE_CLIENT_ID = '1012831124830-12cin5iqg93d6qepehnbftb7u421mlu5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Función para serializar usuario en sesión (o JWT si usas tokens)
passport.serializeUser((user:any, done) => {
  done(null, user);
});

passport.deserializeUser((obj:any, done) => {
  done(null, obj);
});

// Estrategia Google
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes buscar o crear el usuario en tu BD
  /*
  aqui guardare el email,el nombre en mi base de datos en al tabla users
  */
  console.log('Google profile:', profile);

  const userData = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          role:"user"
        };
  // Crear el token JWT
        const token = generateToken(userData);
  return done(null, {...userData,token});
}));