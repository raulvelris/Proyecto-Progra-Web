import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../tailwind.css';


const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/recuperar-contraseña');
  };

  const handleRegister = () => {
    navigate('/registrarse');
  };

  const handleLogin = () => {
    console.log(email, password);
    if (email === "admin@" && password === "admin") {
      navigate('/appadmin/dashboard');
    } else {
      navigate('/app/dashboard');
    }
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      // console.log(event.target.value);
  }

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      // console.log(event.target.value);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex flex-col items-center border-none rounded-xl bg-white p-10 pb-5">
        <h1 className="text-3xl font-bold text-gray-700 mb-10">Log In</h1>
        <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="text" placeholder="Ingresar correo" value={email} onChange={emailChange}/>
        <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="password" placeholder="Ingresar contraseña" value={password} onChange={passwordChange}/>
        <a className="text-blue-400 underline mb-4 cursor-pointer" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-84 mt-2 hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition duration-200" type="button" onClick={handleLogin}>Ingresar</button>
        <p className="text-gray-500 p-1">O</p>
        <button className="bg-gray-500 text-white px-4 py-2 rounded w-84" type="button" onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
};

export default Login;