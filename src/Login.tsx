import './Login.css'

const Login = () => {
    return <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex flex-col items-center border-none rounded-xl bg-white p-10 pb-5">
            <h1 className="text-3xl font-bold text-gray-700 mb-10">Log In</h1>
            <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="text" placeholder="Ingresar correo"/>
            <input className="border border-gray-400 rounded px-4 py-2 w-84 my-2" type="password" placeholder="Ingresar contraseña"/>
            <a className="text-blue-400 underline mb-4" href="#">¿Olvidaste tu contraseña?</a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-84 mt-2 hover:bg-blue-600 active:bg-blue-700 cursor-pointer transition duration-200" type="button">Ingresar</button>
            <p className="text-gray-500 p-1">O</p>
            <button className="bg-gray-500 text-white px-4 py-2 rounded w-84 hover:bg-gray-600 active:bg-gray-700 cursor-pointer transition duration-200" type="button">Registrarse</button>
        </div>
    </div>
}

export default Login;