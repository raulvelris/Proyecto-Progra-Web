import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: "Usuarios nuevos por mes",
        data: [750, 620, 300, 500, 700, 200, 100, 250, 600, 900, 720, 310],
        backgroundColor: "rgba(60,131,230,255)", // Color de relleno
        borderColor: "rgba(60,131,230,255)", // Color del borde
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: true, // Mostrar la cuadrícula
          drawBorder: false, // Evitar la línea en el borde
          color: "rgba(169, 169, 169, 0.3)", // Color de las líneas de la cuadrícula (gris)
          lineWidth: 1, // Grosor de las líneas
        },
      },
      x: {
        grid: {
          display: false, // Desactiva las líneas verticales
        },
      },
    },
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "rgba(243,243,253,255)" }}> {/* Fondo del contenedor principal */}
      <h3 className="mb-5">Dashboard</h3> {/* Separación de título */}
      
      <Row className="mb-5"> {/* Espacio entre filas */}
        <Col md={4}>
          <Card className="mb-5">
            <Card.Body className="text-start">
              <Card.Title>Usuarios Totales</Card.Title>
              <Card.Text className="fs-3 text-center">
                12
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4"> {/* Espacio entre el gráfico y el bloque anterior */}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Usuarios nuevos por mes</Card.Title>
              <Bar data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
