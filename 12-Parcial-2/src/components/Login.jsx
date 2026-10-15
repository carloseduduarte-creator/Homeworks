
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      setError("No se pudo iniciar sesión o registrar la cuenta.");
    }
  }

  return (
    <div className="login-container">
      <h1>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />

        <button type="submit">
          {isRegister ? "Registrarme" : "Entrar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <button
        type="button"
        onClick={() => {
          setIsRegister(!isRegister);
          setError("");
        }}
      >
        {isRegister
          ? "Ya tengo una cuenta"
          : "Crear una cuenta nueva"}
      </button>
    </div>
  );
}

export default Login;
