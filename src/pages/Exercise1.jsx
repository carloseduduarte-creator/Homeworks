import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Exercise1() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Ejercicio 1 - Stack de Libros</h1>

            <p>Usuario: {user.email}</p>

            <p>
                Aquí se mostrará el ejercicio del Stack de libros
                realizado en el Challenge 04.
            </p>

            <button onClick={() => navigate('/exercise2')}>
                Ir al Ejercicio 2
            </button>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}