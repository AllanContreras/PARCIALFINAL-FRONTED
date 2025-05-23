'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AgendarCita() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const [especialidad, setEspecialidad] = useState<any>(null)
  const [form, setForm] = useState({ nombreCompleto: '', cedula: '', correo: '', fecha: '' })
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    axios.get(`https://TU_BACKEND.azurewebsites.net/api/especialidades`)
      .then(res => setEspecialidad(res.data.find((e: any) => e._id === id)))
  }, [id])

  const confirmar = () => {
    if (!form.nombreCompleto || !form.cedula || !form.correo || !form.fecha) {
      setMensaje('Faltan campos')
      return
    }
    axios.post('https://TU_BACKEND.azurewebsites.net/api/citas', { ...form, ...especialidad })
      .then(() => {
        setMensaje('Cita confirmada')
        router.push('/historial?correo=' + form.correo)
      })
      .catch(() => setMensaje('Error al agendar cita'))
  }

  if (!especialidad) return <p>Cargando...</p>

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-lg font-bold">Agendar cita para {especialidad.nombre}</h1>
      <input placeholder="Nombre completo" className="border p-2 w-full" onChange={e => setForm({ ...form, nombreCompleto: e.target.value })} />
      <input placeholder="Cédula" className="border p-2 w-full" onChange={e => setForm({ ...form, cedula: e.target.value })} />
      <input placeholder="Correo" className="border p-2 w-full" onChange={e => setForm({ ...form, correo: e.target.value })} />
      <input type="date" className="border p-2 w-full" onChange={e => setForm({ ...form, fecha: e.target.value.split('-').reverse().join('-') })} />
      <button onClick={confirmar} className="bg-green-500 text-white px-4 py-2">Confirmar Cita</button>
      <p>{mensaje}</p>
    </div>
  )
}