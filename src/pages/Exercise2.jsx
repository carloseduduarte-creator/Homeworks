import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Exercise2() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Ejercicio 2 - Queue de Personas</h1>

            <p>Usuario: {user.email}</p>

            <p>
                Aquí se mostrará el ejercicio de la Queue de personas
                realizado en el Challenge 05.
            </p>

            <button onClick={() => navigate('/exercise1')}>
                Volver al Ejercicio 1
            </button>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}