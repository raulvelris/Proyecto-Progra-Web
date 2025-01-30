import { useMemo } from "react"
import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { obtenerGastos } from "../services/GastoService"

function Graficos() {
  const gastos = obtenerGastos()

  const datosMes = useMemo(() => {
    const mapaMes: Record<string, number> = {
      Ene: 0, Feb: 0, Mar: 0, Abr: 0, May: 0, Jun: 0,
      Jul: 0, Ago: 0, Sep: 0, Oct: 0, Nov: 0, Dic: 0
    }
    const nombres = Object.keys(mapaMes)
    gastos.forEach(g => {
      const idx = new Date(g.fecha).getMonth()
      const mes = nombres[idx] || "?"
      mapaMes[mes] += g.monto
    })
    return {
      labels: Object.keys(mapaMes),
      datasets: [
        {
          label: "Gastos mensuales",
          data: Object.values(mapaMes),
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        }
      ]
    }
  }, [gastos])

  const datosCat = useMemo(() => {
    const mapaCat: Record<string, number> = {}
    gastos.forEach(g => {
      mapaCat[g.categoria] = (mapaCat[g.categoria] || 0) + g.monto
    })
    return {
      labels: Object.keys(mapaCat),
      datasets: [
        {
          label: "Gastos por categoría",
          data: Object.values(mapaCat),
          backgroundColor: "rgba(255, 99, 132, 0.6)"
        }
      ]
    }
  }, [gastos])

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos mensuales</h4>
          <Bar data={datosMes} />
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="p-3 border rounded">
          <h4 className="text-center">Gastos por categoría</h4>
          <Bar data={datosCat} />
        </div>
      </div>
    </div>
  )
}

export default Graficos
