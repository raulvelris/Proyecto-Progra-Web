import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConfirmationPage from './pages/ConfirmationPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PruebaPage from './pages/PruebaPage'
import AddUserModal from './pages/AddUserModal'
import Configuracion from './pages/Configuracion'
import Presupuestos from './pages/Presupuesto'
import ExportarGastoModal from './pages/ExportarGastoModal'
import EliminarPresupuestoModal from './pages/EliminarPresupuestoModal'
import EditarPresupuestoModal from './pages/EditarPresupuestoModal'
import AgregarPresupuestoModal from './pages/AgregarPresupuestoModal'
import TablaH from './components/Historial'
import EliminarGasto from './pages/EliminarGasto'
import Dashboard from './pages/Dashboard'
import FilterUserModal from './pages/FilterUserModal'
import Users from './pages/Users'
import DeleteUserModal from './pages/DeleteUserModal'
import EditUserModal from './pages/EditUserModal'
import ListUsers from './components/ListUsers'
import EditarGasto from './components/EditarGasto'
import RecuperarContraseña from './pages/RecuperarContraseña'
import Gastos from './pages/Gastos'
import EditarPerfilModal from './pages/EditarPerfilModal'
import App from './pages/App'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/prueba" element={<PruebaPage />} />
        <Route path="/olvidastecontra" element={<RecuperarContraseña />} />
        <Route path="/addusermodal" element={<AddUserModal closeModal={function (): void {
          throw new Error('Function not implemented.')
        } } onSave={function (): void {
          throw new Error('Function not implemented.')
        } } />} />
        <Route path="/app/configuracion" element={<Configuracion />} />
        <Route path="/app/presupuestos" element={<Presupuestos />} />
        <Route path="/exportargastomodal" element={<ExportarGastoModal closeModal={() => {}} onExport={() => {}} data={[]} />} />
        <Route path="/eliminarpresupuesto" element={<EliminarPresupuestoModal closeModal={() => {}} onDelete={() => {}} />} />
        <Route path="/editarpresupuesto" element={<EditarPresupuestoModal presupuesto={{ id: 0, categoria: '', monto: 0 }} closeModal={() => {}} onSave={() => {}} />} />
        <Route path="/agregarpresupuesto" element={<AgregarPresupuestoModal closeModal={() => {}} onSave={() => {}} />} />
        <Route path="/historial" element={<TablaH />} />
        <Route path="/eliminargasto" element={<EliminarGasto closeModal={() => {}} onDelete={() => {}} />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/filterusermodal" element={<FilterUserModal closeModal={() => {}} filterRole="" setFilterRole={() => {}} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/deleteusermodal" element={<DeleteUserModal closeModal={() => {}} onDelete={() => {}} />} />
        <Route path="/editusermodal" element={<EditUserModal user={{ id: 0, name: '', email: '', password: '', role: '' }} closeModal={() => {}} onSave={() => {}} />} />
        <Route path="/listusers" element={<ListUsers />} />
        <Route path="/editargasto" element={<EditarGasto id={null} onClose={function (): void {
          throw new Error('Function not implemented.')
        } } onUpdate={function (): void {
          throw new Error('Function not implemented.')
        } } />} />
        <Route path="/app/gastos" element={<Gastos />} />
        <Route path="/editarperfilmodal" element={<EditarPerfilModal configuracion={{ id: 0, nombre: '', email: '', password: '' }} closeModal={() => {}} onSave={() => {}} />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
