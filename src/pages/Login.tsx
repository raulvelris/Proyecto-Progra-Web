import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../tailwind.css';
import ModalLoginError from './ModalLoginError';

export const addAccessLog = async (actionText: string, firstAcc: boolean = false) => {
    const ALInfo = {
        action: actionText,
        firstaccess: firstAcc
    }

    const user = localStorage.getItem('user');
    let token = '';
    if (user) {
      const userInfo = JSON.parse(user);
      token = userInfo.token;
    }

    const resp = await fetch('http://localhost:5000/accesslogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ALInfo)
    });
    
    const data = await resp.json();

    if (data.msg == "") {
      console.log(data.al);
    } else {
      console.log("Error al agregar access log");
    }
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    // console.log(event.target.value);
  }
  
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // console.log(event.target.value);
  }
  
  const handleForgotPassword = () => {
    navigate('/recuperar-contraseña');
  };

  const handleRegister = () => {
    navigate('/registrarse');
  };

  const loginHandler = async (login_email: string, login_pswd: string) => {
    const userData = {
      email: login_email,
      password: login_pswd
    }

    const resp = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await resp.json();
    const token = data.body;

    if (data.msg == "") {
      console.log(data.body);
      setEmail('');
      setPassword('');
      localStorage.setItem('user', JSON.stringify(token));
      token.role_id === 1 ? navigate('/appadmin/dashboard') : navigate('/app/dashboard');
    } else {
      setShowModal(true);
    }
  }

  // Verificar si el usuario ya está autenticado al cargar el componente
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      navigate('app/dashboard'); // Redirigir si ya está autenticado
    }
  }, [navigate]);

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-col items-center border-none rounded-xl bg-white p-10 pb-5">
          <h1 className="text-3xl font-bold text-gray-700 mb-10">Log In</h1>
          <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" 
            type="text" placeholder="Ingresar correo" value={email} onChange={emailChange}/>
          <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" 
            type="password" placeholder="Ingresar contraseña" value={password} onChange={passwordChange}/>
          <a className="text-blue-400 underline mb-4 cursor-pointer" 
            onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-84 mt-2 hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition duration-200" 
            type="button" onClick={async () => {
              // handleLogin();
              await loginHandler(email, password);
              addAccessLog("Login", true);
            }}>Ingresar</button>
          <p className="text-gray-500 p-1">O</p>
          <button className="bg-gray-500 text-white px-4 py-2 rounded w-84 hover:bg-gray-600 active:bg-gray-700 cursor-pointer transition duration-200" 
            type="button" onClick={handleRegister}>Registrarse</button>
        </div>
      </div>
      < ModalLoginError showModal={showModal} closeModal={() => {
        setShowModal(false)
      }} />
    </div>
  );
};

export default Login;