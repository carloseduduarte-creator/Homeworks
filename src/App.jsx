import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';

import Login from './pages/Login.jsx';
import Exercise1 from './pages/Exercise1.jsx';
import Exercise2 from './pages/Exercise2.jsx';

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route
                    path="/exercise1"
                    element={
                        <PrivateRoute>
                            <Exercise1 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/exercise2"
                    element={
                        <PrivateRoute>
                            <Exercise2 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>
        </BrowserRouter>
    );
}