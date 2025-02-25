import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAccessLogs } from "../services/AccessLogService";




interface AccessLogAPIResponse {
  id: number;
  nombre?: string;
  correo?: string;
  createdAt: string;
  action: string;
}




interface AccessLog {
  id: string;
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  accion: string;
}


const TablaH: React.FC = () => {
  
  const [logs, setLogs] = useState<AccessLog[]>([]);


  useEffect(() => {
    const fetchLogs = async () => {
      const data: AccessLogAPIResponse[] = await getAccessLogs();
      if (data) {
        
        const formattedLogs: AccessLog[] = data.map((log) => ({
          id: log.id.toString(),
          nombre: log.nombre || "Desconocido",
          correo: log.correo || "N/A",
          fecha: new Date(log.createdAt).toLocaleDateString(),
          hora: new Date(log.createdAt).toLocaleTimeString(),
          accion: log.action,
        }));
        setLogs(formattedLogs);
      }
    };
    fetchLogs();
  }, []);


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
            {logs.map((item) => (
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
