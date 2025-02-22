import React, { useState } from 'react';
import '../tailwind.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const userChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
        // console.log(event.target.value);
    }

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        // console.log(event.target.value);
    }

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        // console.log(event.target.value);
    }

    const registerClick = () => {
        navigate('/confirmation');
    }

    const registerHandler = async (register_user: string, register_email: string, register_pswd: string) => {
        const userData = {
            user: register_user,
            email: register_email,
            password: register_pswd
        }

        const resp = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await resp.json();
        if (data.msg == "") {
            navigate('/confirmation');
        } else {
            console.log(data.msg);
        }
    }

    const sendEmail = async () => {
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Test',
                    html: '<p>Este es un correo de prueba enviado desde Resend.</p>',
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="flex justify-center items-center h-screen bg-gray-200">
    <form className="flex flex-col items-center border-none rounded-xl bg-white p-10 pb-5">
        <h1 className="text-3xl font-bold text-gray-700 mb-5">Registro</h1>
        <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="text" 
            placeholder="Nombre de usuario" value={user} onChange={userChange}/>
        <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="text" 
            placeholder="Correo de usuario"value={email} onChange={emailChange}/>
        <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="password" 
            placeholder="Contraseña" value={password} onChange={passwordChange}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-84 mt-4 hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition duration-200" 
            type="button" onClick={() => {
                registerClick();
                // sendEmail();
            }}>Registrar</button>
    </form>
</div>
}

export default RegisterPage;