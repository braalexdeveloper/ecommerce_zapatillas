import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessGoogle = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true, // muy importante para enviar la cookie
        });
        // Guardar solo info no sensible
        localStorage.setItem("user", JSON.stringify({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role
        }));
        navigate("/mis-pedidos");
      } catch (error) {
        console.error("Usuario no autenticado", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return null; // no hace falta renderizar nada
};
