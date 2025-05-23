'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Historial() {
  const searchParams = useSearchParams()
  const correo = searchParams.get('correo') || ''
  const [citas, setCitas] = useState([])
  const [estadoFiltro, setEstadoFiltro] = useState('')

  const cargarCitas = () => {
    axios.get(`https://TU_BACKEND.azurewebsites.net/api/citas/usuario/${correo}`)
      .then(res => setCitas(res.data))
  }

  useEffect(() => {
    if (correo) cargarCitas()
  }, [correo])

  const cancelar = async (id: string) => {
    await axios.patch(`https://TU_BACKEND.azurewebsites.net/api/citas/cancelar/${id}`)
    cargarCitas()
  }

  const citasFiltradas = estadoFiltro ? citas.filter((c: any) => c.estado === estadoFiltro) : citas

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de Citas</h1>
      <select className="mb-4 border p-2" onChange={e => setEstadoFiltro(e.target.value)}>
        <option value="">Todas</option>
        <option value="Confirmada">Confirmadas</option>
        <option value="Cancelada">Canceladas</option>
      </select>
      <div className="space-y-4">
        {citasFiltradas.map((cita: any) => (
          <div key={cita._id} className="border p-4 rounded shadow">
            <p><b>ID:</b> {cita._id}</p>
            <p><b>Especialidad:</b> {cita.especialidad}</p>
            <p><b>Fecha:</b> {cita.fecha}</p>
            <p><b>Estado:</b> <span style={{ color: cita.estado === 'Confirmada' ? 'green' : 'red' }}>{cita.estado}</span></p>
            {cita.estado === 'Confirmada' && (
              <button onClick={() => cancelar(cita._id)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}