import React from 'react';
import { Table } from 'react-bootstrap';

interface HI {
  id: string;
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  accion: string;
}

const TablaH: React.FC = () => {
  const DataH: HI[] = [
    { id: '001', nombre: 'Jessica', correo: 'jess@taxes.com', fecha: '12/12/2024', hora: '17:50', accion: 'Borrar' },
    { id: '002', nombre: 'Jhon', correo: 'jon@taxes.com', fecha: '17/12/2024', hora: '19:50', accion: 'Agregar' },
    { id: '003', nombre: 'Diego', correo: 'dieg@taxes.com', fecha: '22/12/2024', hora: '14:20', accion: 'Editar' },
    { id: '004', nombre: 'Juan', correo: 'juan@taxes.com', fecha: '02/12/2024', hora: '13:50', accion: 'Borrar' },
    { id: '005', nombre: 'Luis', correo: 'luis@taxes.com', fecha: '07/12/2024', hora: '12:50', accion: 'Borrar' },
  ];


  return (
    <div className="table-section">
      <h2 className="table-title">Historial</h2>
      <div className="table-container">
        <Table className="custom-table" hover>
          <thead>
            <tr>
              <th className="rounded-header">Id</th>
              <th className="rounded-header">Nombre</th>
              <th className="rounded-header">Correo</th>
              <th className="rounded-header">Fecha</th>
              <th className="rounded-header">Hora</th>
              <th className="rounded-header">Acción</th>
            </tr>
          </thead>
          <tbody>
            {DataH.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.correo}</td>
                <td>{item.fecha}</td>
                <td>{item.hora}</td>
                <td>{item.accion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablaH;

